import axios from 'axios';
import { Refresh } from '../apis/auth';
import { queryClient } from '../main';

const axiosUserInstance = axios.create({
    baseURL: import.meta.env.VITE_USER_API_URL,
});
let isRedirecting = false;

axiosUserInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log(error);
        if (error.response?.data.statusCode === 401) {
            if (isRedirecting) {
                return Promise.reject(error);
            }

            if (error.response.data.message === 'Unauthorized') {
                isRedirecting = true;
                const refreshToken = localStorage.getItem('refreshToken') || '';
                if (refreshToken !== '') {
                    const response = await Refresh(refreshToken);
                    if (response.accessToken) {
                        const newAccessToken = response.accessToken;
                        const newRefreshToken = response.refreshToken;
                        localStorage.setItem('accessToken', newAccessToken);
                        localStorage.setItem('refreshToken', newRefreshToken);
                        error.config.headers.Authorization = `Bearer ${response.accessToken}`;
                        queryClient.invalidateQueries({ queryKey: ['myInfo'] });
                        return axiosUserInstance(error.config);
                    } else {
                        console.log(
                            '알 수 없는 오류가 발생했습니다.',
                            response
                        );
                        localStorage.clear();
                    }
                } else {
                    window.location.replace('/login');
                    localStorage.clear();
                }
            }
        }
        return Promise.reject(error);
    }
);

export { axiosUserInstance };

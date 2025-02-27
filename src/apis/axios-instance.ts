import axios from 'axios';
import { Refresh } from './auth';
import { queryClient } from '../main';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_USER_API_URL,
});
let isRedirecting = false;

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log(error);
        if (error.response?.data.statusCode === 401) {
            if (isRedirecting) {
                window.location.replace('/login');
                return Promise.reject(error);
            }

            if (error.response.data.message === 'Unauthorized') {
                isRedirecting = true;
                const refreshToken = localStorage.getItem('refreshToken') || '';

                if (refreshToken !== '') {
                    const response = await Refresh();
                    console.log(response);
                    if (response.accessToken) {
                        const newAccessToken = response.accessToken;
                        const newRefreshToken = response.refreshToken;
                        localStorage.setItem('accessToken', newAccessToken);
                        localStorage.setItem('refreshToken', newRefreshToken);
                        error.config.headers.Authorization = `Bearer ${response.accessToken}`;
                        queryClient.invalidateQueries({ queryKey: ['myInfo'] });
                        isRedirecting = false;
                        return axiosInstance(error.config);
                    } else {
                        console.log(
                            '알 수 없는 오류가 발생했습니다.',
                            response
                        );
                        window.location.replace('/login');
                        localStorage.clear();
                        isRedirecting = false;
                    }
                } else {
                    window.location.replace('/login');
                    localStorage.clear();
                    isRedirecting = false;
                }
            }
        }
        isRedirecting = false;
        window.location.replace('/login');

        return Promise.reject(error);
    }
);

export { axiosInstance };

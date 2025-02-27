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
        const { response } = error;

        if (response?.data?.statusCode !== 401) {
            return Promise.reject(error);
        }

        if (isRedirecting) {
            window.location.replace('/login');
            return Promise.reject(error);
        }

        if (response.data.message !== 'Unauthorized') {
            isRedirecting = false;
            window.location.replace('/login');
            return Promise.reject(error);
        }

        isRedirecting = true;
        const refreshToken = localStorage.getItem('refreshToken') || '';

        if (!refreshToken) {
            localStorage.clear();
            window.location.replace('/login');
            isRedirecting = false;
            return Promise.reject(error);
        }

        try {
            const { accessToken, refreshToken: newRefreshToken } =
                await Refresh();

            if (!accessToken) {
                throw new Error('알 수 없는 오류 발생');
            }

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            error.config.headers.Authorization = `Bearer ${accessToken}`;
            queryClient.invalidateQueries({ queryKey: ['myInfo'] });
            isRedirecting = false;

            return axiosInstance(error.config);
        } catch (refreshError) {
            console.log('알 수 없는 오류가 발생했습니다.', refreshError);
            localStorage.clear();
            window.location.replace('/login');
            isRedirecting = false;
            return Promise.reject(error);
        }
    }
);

export { axiosInstance };

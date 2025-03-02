import { TMyInfoResponse, TUserInfoResponse } from '../types/user';
import { axiosInstance } from './axios-instance';

const getMyInfo = async (): Promise<TMyInfoResponse> => {
    const accessToken = localStorage.getItem('accessToken') || '';

    const { data } = await axiosInstance.get('/v1/users/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return data;
};

const getOtherUserInfo = async ({
    userId,
}: {
    userId: number;
}): Promise<TUserInfoResponse> => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const { data } = await axiosInstance.get(`/v1/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return data;
};

export { getMyInfo, getOtherUserInfo };

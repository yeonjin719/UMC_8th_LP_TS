import { TMyInfoResponse, TUserEdit, TUserInfoResponse } from '../types/user';
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

const patchUserInfo = async ({ name, bio, avatar }: TUserEdit) => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const { data } = await axiosInstance.patch(
        `/v1/users`,
        {
            name,
            bio,
            avatar,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return data;
};
export { getMyInfo, getOtherUserInfo, patchUserInfo };

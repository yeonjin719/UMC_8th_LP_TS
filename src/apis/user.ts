import { axiosInstance } from './axios-instance';
export type TMyInfo = {
    accessToken: string;
};

export type TMyInfoResponse = {
    id: number;
    email: string;
    name: string;
    profileImageUrl: string | null;
    role: string;
    createdAt: string;
    updatedAt: string;
};

const getMyInfo = async (): Promise<TMyInfoResponse> => {
    const accessToken = localStorage.getItem('accessToken') || '';

    const { data } = await axiosInstance.get('/v1/users/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return data;
};

export { getMyInfo };

import { axiosUserInstance } from './axios-instance';
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

const getMyInfo = async (accessToken: string): Promise<TMyInfoResponse> => {
    const { data } = await axiosUserInstance.get('/v1/users/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return data;
};

export { getMyInfo };

import { TCommonResponse } from './common';

export type TMyInfoResponse = TCommonResponse<TUserInfo>;

export type TLogin = {
    email: string;
    password: string;
};

export type TSignup = {
    email: string;
    password: string;
    name: string;
    bio: string | null;
    avatar: string | null;
};
export type TLoginResponse = TCommonResponse<{
    accessToken: string;
    refreshToken: string;
    id: number;
    name: string;
}>;

export type TSignupResponse = TCommonResponse<TUserInfo>;

export type TUserInfo = {
    id: number;
    email: string;
    password: string;
    name: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
};

export type TRefreshResponse = {
    refreshToken: string;
    accessToken: string;
};

export type TGoogleLoginResponse = {
    isSuccess: boolean;
    code: string;
    message: string;
};

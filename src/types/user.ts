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

export type TSignupResponse = TCommonResponse<TSignupUserInfo>;

export type TUserInfo = {
    id: number;
    email: string;
    name: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
};

export type TSignupUserInfo = {
    id: number;
    email: string;
    password: string;
    name: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
};

export type TRefresh = {
    refreshToken: string;
    accessToken: string;
    id: string;
    name: string;
};

export type TRefreshResponse = TCommonResponse<TRefresh>;

export type TGoogleLoginResponse = {
    isSuccess: boolean;
    code: string;
    message: string;
};

export type TUserInfoResponse = TCommonResponse<TUserInfo>;

export type TUserEdit = {
    avatar: string | null;
    bio: string | null;
    name: string;
};

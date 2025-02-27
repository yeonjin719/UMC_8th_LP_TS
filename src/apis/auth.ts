import { axiosInstance } from './axios-instance';

type TLogin = {
    email: string;
    password: string;
};

type TSignup = {
    email: string;
    password: string;
    name: string;
    role: string;
    profileImageUrl: string | null;
};
type TLoginResponse = {
    accessToken: string;
    refreshToken: string;
    id: number;
    name: string;
    role: string;
};

type TSignupResponse = {
    id: number;
    email: string;
    password: string;
};

type TRefreshResponse = {
    refreshToken: string;
    accessToken: string;
};

type TGoogleLoginResponse = {
    isSuccess: boolean;
    code: string;
    message: string;
};

const Login = async ({ email, password }: TLogin): Promise<TLoginResponse> => {
    const { data } = await axiosInstance.post<TLoginResponse>(
        '/v1/auth/signin',
        { email, password }
    );
    return data;
};

const Signup = async ({
    email,
    password,
    name,
    profileImageUrl,
    role,
}: TSignup): Promise<TSignupResponse> => {
    const { data } = await axiosInstance.post<TSignupResponse>(
        '/v1/auth/signup',
        { email, password, name, role, profileImageUrl }
    );
    return data;
};

const GoogleLogin = async (): Promise<TGoogleLoginResponse> => {
    const { data } = await axiosInstance.get('/v1/auth/google/login');
    return data;
};

const Refresh = async (): Promise<TRefreshResponse> => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const refreshToken = localStorage.getItem('refreshToken') || '';
    const { data } = await axiosInstance.post<TRefreshResponse>(
        '/v1/auth/refresh',
        { refresh: refreshToken },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return data;
};

const Logout = async (accessToken: string) => {
    const { data } = await axiosInstance.post(
        '/v1/auth/signout',
        {},
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return data;
};
const Withdraw = async (id: number) => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const { data } = await axiosInstance.delete(`/v1/users/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return data;
};
export { Login, Signup, Withdraw, GoogleLogin, Refresh, Logout };

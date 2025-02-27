import { axiosUserInstance } from './axios-instance';

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
    const { data } = await axiosUserInstance.post<TLoginResponse>(
        '/v1/auth/signin',
        { email, password },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        }
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
    const { data } = await axiosUserInstance.post<TSignupResponse>(
        '/v1/auth/signup',
        { email, password, name, role, profileImageUrl },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        }
    );
    return data;
};

const GoogleLogin = async (): Promise<TGoogleLoginResponse> => {
    const { data } = await axiosUserInstance.get('/v1/auth/google/login', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return data;
};

const Refresh = async (refreshToken: string): Promise<TRefreshResponse> => {
    const { data } = await axiosUserInstance.post<TRefreshResponse>(
        '/v1/auth/refresh',
        {},
        {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        }
    );
    return data;
};

const Logout = async (accessToken: string) => {
    const { data } = await axiosUserInstance.post(
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
    const { data } = await axiosUserInstance.delete(`/v1/users/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return data;
};
export { Login, Signup, Withdraw, GoogleLogin, Refresh, Logout };

import { axiosUserInstance } from './axios-instance';

type TLogin = {
    email: string;
    password: string;
};

type TSignup = {
    email: string;
    password: string;
    passwordCheck: string;
};
type TLoginResponse = {
    accessToken: string;
    refreshToken: string;
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

const Login = async ({ email, password }: TLogin): Promise<TLoginResponse> => {
    const { data } = await axiosUserInstance.post<TLoginResponse>(
        '/auth/login',
        { email, password }
    );
    return data;
};

const Signup = async ({
    email,
    password,
    passwordCheck,
}: TSignup): Promise<TSignupResponse> => {
    const { data } = await axiosUserInstance.post<TSignupResponse>(
        '/auth/register',
        { email, password, passwordCheck }
    );
    return data;
};

const Refresh = async (refreshToken: string): Promise<TRefreshResponse> => {
    const { data } = await axiosUserInstance.post<TRefreshResponse>(
        '/auth/token/access',
        {},
        {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        }
    );
    return data;
};

export { Login, Signup, Refresh };

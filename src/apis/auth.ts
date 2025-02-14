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

const Login = async ({ email, password }: TLogin): Promise<TLoginResponse> => {
    const { data } = await axiosUserInstance.post<TLoginResponse>(
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
    const { data } = await axiosUserInstance.post<TSignupResponse>(
        '/v1/auth/signup',
        { email, password, name, role, profileImageUrl }
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

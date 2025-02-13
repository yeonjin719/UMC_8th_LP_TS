import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Login } from '../../apis/auth';
import { useAuthContext } from '../../context/LogInContext';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import googleLogo from '../../images/googleLogo.svg';
type TLoginForm = {
    email: string;
    password: string;
};

const schema = yup.object().shape({
    email: yup.string().email().required('이메일을 반드시 입력해주세요.'),
    password: yup
        .string()
        .min(8, '비밀번호는 8자 이상이어야 합니다.')
        .max(16, '비밀번호는 16자 이하여야 합니다.')
        .required('비밀번호를 입력해주세요.'),
});

const LogIn = () => {
    const navigate = useNavigate();
    const { setIsLogin } = useAuthContext();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<TLoginForm>({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const { mutate: loginMutation, isPending } = useMutation({
        mutationFn: Login,
        onSuccess: (data) => {
            const { accessToken, refreshToken } = data;
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('accessToken', accessToken);
            setIsLogin(true);
            console.log('로그인 성공');
            navigate('/');
        },
        onError: (error) => {
            console.error('로그인 실패:', error);
        },
    });

    const onSubmit = (data: TLoginForm) => {
        loginMutation(data);
    };

    return (
        <div className="flex flex-col items-center gap-2 mt-36 w-full">
            <div className="w-[300px] items-center flex flex-col">
                <div className="text-white text-2xl mb-4 w-full">로그인</div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-[20px] w-full"
                >
                    <input
                        type="email"
                        placeholder="이메일을 입력해주세요!"
                        className="w-full h-10 rounded-md border-none pl-2 bg-white"
                        {...register('email')}
                    />
                    {errors.email && (
                        <div className="text-red-500 text-sm pl-1">
                            {errors.email.message}
                        </div>
                    )}

                    <input
                        type="password"
                        placeholder="비밀번호를 입력해주세요!"
                        className="w-full h-10 rounded-md border-none pl-2  bg-white"
                        {...register('password')}
                    />
                    {errors.password && (
                        <div className="text-red-500 text-sm pl-1">
                            {errors.password.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!isValid || isPending}
                        className={`w-full h-11 rounded-md text-white text-sm ${
                            !isValid || isPending
                                ? 'bg-gray-500 opacity-60 cursor-not-allowed'
                                : 'bg-pink-600'
                        }`}
                    >
                        {isPending ? '로딩 중...' : '로그인'}
                    </button>
                </form>
                <button
                    type="button"
                    className="bg-[white] w-full h-[45px] text-[#000000] mt-[20px] rounded-[12px] relative"
                >
                    <img
                        src={googleLogo}
                        alt=""
                        className="absolute left-4 bottom-2.5 w-[25px] h-[25px]"
                    />
                    구글 로그인
                </button>
                <button
                    type="button"
                    className="text-gray-300 mt-[20px]"
                    onClick={() => navigate('/signup')}
                >
                    회원가입
                </button>
            </div>
        </div>
    );
};

export default LogIn;

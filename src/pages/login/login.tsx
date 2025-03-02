import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../context/LogInContext';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../../images/googleLogo.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../utils/validate';
import useAuth from '../../hooks/queries/useAuth';
import { IoIosArrowBack } from 'react-icons/io';

type TLoginForm = {
    email: string;
    password: string;
};

const LogIn = () => {
    const navigate = useNavigate();
    const { setIsLogin, setNickname, setUserId } = useAuthContext();
    const { useLogin } = useAuth();
    const { mutate: loginMutate, isPending } = useLogin;

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<TLoginForm>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
    });

    const onSubmit = (data: TLoginForm) => {
        loginMutate(data, {
            onSuccess: (data) => {
                const { accessToken, refreshToken } = data.data;
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('accessToken', accessToken);
                setIsLogin(true);
                setUserId(data.data.id);
                setNickname(data.data.name);
                console.log('로그인 성공');
                navigate('/');
            },
            onError: () => {
                alert('로그인에 실패하였습니다');
            },
        });
    };

    return (
        <div className="flex flex-col items-center gap-2 mt-36 w-full ">
            <div className="w-[300px] items-center flex flex-col relative">
                <IoIosArrowBack
                    size={25}
                    color="white"
                    className="absolute left-[4px] top-[4px]"
                    onClick={() => navigate('/')}
                />
                <div className="text-white text-2xl mb-4 w-full text-center">
                    로그인
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-[20px] w-full"
                >
                    <button
                        type="button"
                        className="w-full h-[45px] border-[0.5px] border-white text-white mt-[20px] rounded-[10px] relative"
                        onClick={() => navigate('/loginRedirect')}
                    >
                        <img
                            src={googleLogo}
                            alt=""
                            className="absolute left-4 bottom-2.5 w-[25px] h-[25px]"
                        />
                        구글 로그인
                    </button>
                    <div className="flex w-full text-white justify-center items-center">
                        <div className="border-white min-w-[300px] border-t-[0.5px] absolute" />
                        <span className="w-[120px] flex bg-black z-1 justify-center">
                            OR
                        </span>
                    </div>
                    <input
                        type="email"
                        placeholder="이메일을 입력해주세요!"
                        className="w-full border-[0.8px] border-[#e2e2e2] h-10 rounded-md pl-2 text-white bg-[#161616]"
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
                        className="w-full border-[0.8px] border-[#e2e2e2] h-10 rounded-md pl-2 text-white bg-[#161616]"
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
                        className={`w-full h-11 bg-pink-500 rounded-md text-white text-sm disabled:bg-[#161616] disabled:text-[#959595] disabled:hover:cursor-not-allowed`}
                    >
                        {isPending ? '로딩 중...' : '로그인'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LogIn;

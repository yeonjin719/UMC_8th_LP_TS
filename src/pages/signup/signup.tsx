import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Signup } from '../../apis/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../../images/googleLogo.svg';

interface SignupForm {
    email: string;
    password: string;
    passwordCheck: string;
}

const SignUp = () => {
    const navigate = useNavigate();
    const schema = yup.object().shape({
        email: yup.string().email().required('이메일을 반드시 입력해주세요.'),
        password: yup
            .string()
            .min(8, '비밀번호는 8자 이상이어야 합니다.')
            .max(16, '비밀번호는 16자 이하여야 합니다.')
            .required('비밀번호를 입력해주세요.'),
        passwordCheck: yup
            .string()
            .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다')
            .required('비밀번호 검증 또한 필수 입력 요소입니다.'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const { mutate: signupMutation, isPending } = useMutation({
        mutationFn: Signup,
        onSuccess: () => {
            console.log('회원가입 성공');
            navigate('/login');
        },
        onError: (error) => {
            console.error('Error signup:', error);
        },
    });

    const onSubmit = (data: SignupForm) => {
        signupMutation(data);
    };

    return (
        <div className="flex flex-col items-center gap-2 mt-36 w-full">
            <div className="w-[300px] items-center flex flex-col">
                <div className="text-white text-2xl mb-4 w-full">회원가입</div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col w-full gap-3"
                >
                    <input
                        type="email"
                        placeholder="이메일을 입력해주세요!"
                        {...register('email')}
                        className="w-full h-10 rounded-md border-none pl-2 box-border bg-white"
                    />
                    {errors.email?.message && (
                        <div className="text-red-500 text-sm ml-1">
                            {errors.email?.message}
                        </div>
                    )}

                    <input
                        type="password"
                        placeholder="비밀번호를 입력해주세요!"
                        {...register('password')}
                        className="w-full h-10 rounded-md border-none pl-2 box-border bg-white"
                    />
                    {errors.password?.message && (
                        <div className="text-red-500 text-sm ml-1">
                            {errors.password?.message}
                        </div>
                    )}

                    <input
                        type="password"
                        placeholder="비밀번호를 다시 입력해주세요!"
                        {...register('passwordCheck')}
                        className="w-full h-10 rounded-md border-none pl-2 box-border bg-white"
                    />
                    {errors.passwordCheck?.message && (
                        <div className="text-red-500 text-sm ml-1">
                            {errors.passwordCheck?.message}
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
                        {isPending ? '로딩 중...' : '회원가입'}
                    </button>
                </form>
                <button
                    type="button"
                    className="bg-[white] w-full h-[45px] text-[#000000]/85 mt-[20px] rounded-[12px] relative"
                >
                    <img
                        src={googleLogo}
                        alt=""
                        className="absolute left-4 bottom-2.5 w-[25px] h-[25px]"
                    />
                    구글 회원가입
                </button>
                <button
                    type="button"
                    className="text-gray-300 mt-[20px]"
                    onClick={() => navigate('/login')}
                >
                    로그인 하러 가기
                </button>
            </div>
        </div>
    );
};

export default SignUp;

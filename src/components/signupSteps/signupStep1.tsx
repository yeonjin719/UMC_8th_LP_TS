import { useFormContext, useWatch } from 'react-hook-form';
import { SignupForm } from '../../pages/signup/signup';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../../images/googleLogo.svg';

interface Step1Props {
    nextStep: () => void;
}

export default function Step1({ nextStep }: Step1Props) {
    const navigate = useNavigate();
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<SignupForm>();

    const watchedEmail = useWatch({
        control,
        name: 'email',
    });

    return (
        <div className="w-full flex flex-col items-center gap-3 justify-center h-fit">
            <button
                type="button"
                className="w-full h-[45px] border-[0.5px] border-[#e2e2e2] text-white mt-[20px] rounded-md relative hover:bg-[#4b4e52] transition-colors duration-300"
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
                {...register('email')}
                className="w-full h-10 rounded-md pl-2 bg-[#161616] text-white border-[0.8px] border-[#e2e2e2]"
            />
            {errors?.email?.message && (
                <div className="text-red-500 text-sm">
                    {errors.email.message}
                </div>
            )}

            <button
                onClick={nextStep}
                disabled={!!errors.email?.message || !watchedEmail}
                className="w-full bg-pink-500 text-white p-2 rounded-md disabled:bg-[#161616] disabled:text-[#959595] disabled:hover:cursor-not-allowed"
            >
                다음
            </button>
        </div>
    );
}

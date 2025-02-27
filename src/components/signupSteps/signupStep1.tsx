import { useFormContext, useWatch } from 'react-hook-form';
import { SignupForm } from '../../pages/signup/signup';

interface Step1Props {
    nextStep: () => void;
}

export default function Step1({ nextStep }: Step1Props) {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<SignupForm>();

    const watchedPassword = useWatch({
        control,
        name: 'passwordGroup.password',
    });
    const watchedRepassword = useWatch({
        control,
        name: 'passwordGroup.passwordCheck',
    });

    const watchedEmail = useWatch({
        control,
        name: 'email',
    });

    return (
        <div className="w-full flex flex-col items-center gap-3 justify-center h-fit">
            <input
                type="email"
                placeholder="이메일을 입력해주세요!"
                {...register('email')}
                className="w-full h-10 rounded-md pl-2 bg-white"
            />
            {errors?.email?.message && (
                <div className="text-red-500 text-sm">
                    {errors.email.message}
                </div>
            )}

            <input
                type="password"
                placeholder="비밀번호를 입력해주세요!"
                {...register('passwordGroup.password')}
                className="w-full h-10 rounded-md pl-2 bg-white"
            />
            {errors.passwordGroup?.password?.message && (
                <div className="text-red-500 text-sm">
                    {errors.passwordGroup.password.message}
                </div>
            )}

            <input
                type="password"
                placeholder="비밀번호를 다시 한 번 입력해주세요!"
                {...register('passwordGroup.passwordCheck')}
                className="w-full h-10 rounded-md pl-2 bg-white"
            />
            {errors.passwordGroup?.passwordCheck?.message && (
                <div className="text-red-500 text-sm">
                    {errors.passwordGroup.passwordCheck.message}
                </div>
            )}

            <button
                onClick={nextStep}
                disabled={
                    !!errors.email?.message ||
                    !!errors.passwordGroup?.password?.message ||
                    !!errors.passwordGroup?.passwordCheck?.message ||
                    !watchedEmail ||
                    !watchedPassword ||
                    !watchedRepassword
                }
                className="w-full bg-pink-500 text-white p-2 rounded-md disabled:cursor-not-allowed disabled:bg-gray-400"
            >
                다음
            </button>
        </div>
    );
}

import { useFormContext, useWatch } from 'react-hook-form';
import { SignupForm } from '../../pages/signup/signup';
import { IoMdMail } from 'react-icons/io';
import { RxEyeClosed } from 'react-icons/rx';
import { LuEye } from 'react-icons/lu';
import { useState } from 'react';
interface Step1Props {
    nextStep: () => void;
}
export default function Step2({ nextStep }: Step1Props) {
    const {
        register,
        control,
        getValues,
        formState: { errors },
    } = useFormContext<SignupForm>();
    const [passwordOpen, setPasswordOpen] = useState(false);
    const [passwordCheckOpen, setPasswordCheckOpen] = useState(false);

    const watchedPassword = useWatch({
        control,
        name: 'passwordGroup.password',
    });
    const watchedRepassword = useWatch({
        control,
        name: 'passwordGroup.passwordCheck',
    });

    return (
        <div className="w-full flex flex-col items-center gap-3 h-full">
            <div className="text-white w-full flex gap-2 items-center">
                <IoMdMail size={20} color="white" />
                {getValues('email')}
            </div>
            <div className="w-full flex relative">
                <input
                    type={passwordOpen ? 'text' : 'password'}
                    placeholder="비밀번호를 입력해주세요!"
                    {...register('passwordGroup.password')}
                    className="w-full h-10 rounded-md pl-2 bg-[#161616] text-white"
                />
                {passwordOpen ? (
                    <LuEye
                        color="white"
                        className="absolute right-2 top-3"
                        onClick={() => setPasswordOpen(false)}
                    />
                ) : (
                    <RxEyeClosed
                        color="white"
                        className="absolute right-2 top-3"
                        onClick={() => setPasswordOpen(true)}
                    />
                )}
            </div>

            {errors.passwordGroup?.password?.message && (
                <div className="text-red-500 text-sm w-full">
                    {errors.passwordGroup.password.message}
                </div>
            )}
            <div className="w-full flex relative">
                <input
                    type={passwordCheckOpen ? 'text' : 'password'}
                    placeholder="비밀번호를 다시 한 번 입력해주세요!"
                    {...register('passwordGroup.passwordCheck')}
                    className="w-full h-10 rounded-md pl-2 bg-[#161616] text-white"
                />
                {passwordCheckOpen ? (
                    <LuEye
                        color="white"
                        className="absolute right-2 top-3"
                        onClick={() => setPasswordCheckOpen(false)}
                    />
                ) : (
                    <RxEyeClosed
                        color="white"
                        className="absolute right-2 top-3"
                        onClick={() => setPasswordCheckOpen(true)}
                    />
                )}
            </div>

            {errors.passwordGroup?.passwordCheck?.message && (
                <div className="text-red-500 text-sm w-full">
                    {errors.passwordGroup.passwordCheck.message}
                </div>
            )}
            <button
                onClick={nextStep}
                disabled={
                    !!errors.passwordGroup?.password ||
                    !!errors.passwordGroup?.passwordCheck ||
                    !!errors.passwordGroup?.message ||
                    !watchedPassword ||
                    !watchedRepassword
                }
                className="w-full bg-pink-500 text-white p-2 rounded-md disabled:cursor-not-allowed disabled:bg-[#161616] disabled:text-[#959595] disabled:hover:cursor-not-allowed"
            >
                다음
            </button>
        </div>
    );
}

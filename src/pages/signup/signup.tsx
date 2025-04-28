import { useState } from 'react';

import Step1 from '../../components/signupSteps/signupStep1';
import Step2 from '../../components/signupSteps/signupStep2';
import {
    FormProvider,
    SubmitHandler,
    useForm,
    useWatch,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IoIosArrowBack } from 'react-icons/io';
import { signUpSchema } from '../../utils/validate';
import { z } from 'zod';
import useAuth from '../../hooks/queries/useAuth';
import { useNavigate } from 'react-router-dom';
import Step3 from '../../components/signupSteps/signupStep3';

export interface SignupForm {
    email: string;
    passwordGroup: {
        password: string;
        passwordCheck: string;
    };
    avatar: string | null;
    bio: string | null;
    name: string;
}

type TField = z.infer<typeof signUpSchema>;

const MainSignup = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const { useSignup } = useAuth();
    const { mutate: signupMutate } = useSignup;

    const [errorMessage, setErrorMessage] = useState('');
    const [imageSrc, setImageSrc] = useState<null | undefined | string>(null);
    const methods = useForm<SignupForm>({
        mode: 'onChange',
        resolver: zodResolver(signUpSchema),
        defaultValues: { bio: null, avatar: null },
    });

    const nextStep1 = () => setStep(2);
    const nextStep2 = () => setStep(3);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = methods;

    const watchedName = useWatch({
        control,
        name: 'name',
    });

    const onSubmit: SubmitHandler<TField> = (data) => {
        signupMutate(
            {
                email: data.email,
                password: data.passwordGroup.password,
                name: data.name,
                bio: data.bio,
                avatar: imageSrc ?? null,
            },
            {
                onSuccess: () => {
                    navigate('/login');
                },
                onError: (error) => {
                    setErrorMessage(
                        error.response?.data?.message ||
                            '알 수 없는 에러가 발생했습니다'
                    );
                },
            }
        );
    };

    const handleBack = () => {
        if (step == 2) {
            setStep(1);
            return;
        }
        if (step == 3) {
            setStep(2);
            return;
        }
        navigate('/');
    };

    return (
        <FormProvider {...methods}>
            <div className="flex flex-col items-center gap-2 mt-[10%] w-full">
                <div className="w-[340px] h-fit justify-center relative p-[20px] rounded-[20px]">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col items-center w-full"
                    >
                        <IoIosArrowBack
                            size={25}
                            color="white"
                            className="absolute left-[20px] top-[25px]"
                            onClick={handleBack}
                        />
                        <div className="text-white text-2xl w-full mb-[20px] text-center">
                            회원가입
                        </div>

                        {step === 1 ? (
                            <Step1 nextStep={nextStep1} />
                        ) : step === 2 ? (
                            <Step2 nextStep={nextStep2} />
                        ) : (
                            <>
                                <Step3
                                    setImageSrc={setImageSrc}
                                    imageSrc={imageSrc}
                                />
                                {errorMessage && (
                                    <div className="w-full mt-2 text-sm text-red-500">
                                        {errorMessage}
                                    </div>
                                )}
                            </>
                        )}
                    </form>

                    {step === 3 && (
                        <button
                            onClick={handleSubmit(onSubmit)}
                            type="submit"
                            className="mt-4 w-[300px] bg-pink-500 text-white p-2 rounded-md disabled:bg-[#161616] disabled:text-[#959595] disabled:hover:cursor-not-allowed"
                            disabled={
                                !!errors.name?.message ||
                                !watchedName ||
                                !!errorMessage
                            }
                        >
                            회원가입 완료
                        </button>
                    )}
                </div>
            </div>
        </FormProvider>
    );
};

export default MainSignup;

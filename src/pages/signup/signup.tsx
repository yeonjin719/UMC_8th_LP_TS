import { useState } from 'react';
import googleLogo from '../../images/googleLogo.svg';
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

export interface SignupForm {
    email: string;
    passwordGroup: {
        password: string;
        passwordCheck: string;
    };
    profileImage: string | null;
    role: string;
    name: string;
}

type TField = z.infer<typeof signUpSchema>;

const MainSignup = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const { useSignup } = useAuth();
    const { mutate: signupMutate } = useSignup;
    const [errorMessage, setErrorMessage] = useState('');
    const methods = useForm<SignupForm>({
        mode: 'onChange',
        resolver: zodResolver(signUpSchema),
        defaultValues: { role: 'USER', profileImage: null },
    });

    const nextStep = () => setStep(2);

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
                role: data.role,
                profileImageUrl: data.profileImage,
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
        } else {
            navigate('/');
        }
    };

    return (
        <FormProvider {...methods}>
            <div className="w-full h-full flex flex-col items-center">
                <div className="w-[340px] h-fit justify-center relative p-[20px] rounded-[20px] mt-[70px]">
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
                        <div className="text-white text-2xl w-full mb-[50px] text-center">
                            회원가입
                        </div>
                        {errorMessage && (
                            <div className="text-red-500 text-sm absolute right-[22px] top-[75px]">
                                {errorMessage}
                            </div>
                        )}
                        {step === 1 ? <Step1 nextStep={nextStep} /> : <Step2 />}
                    </form>

                    {step === 2 && (
                        <button
                            onClick={handleSubmit(onSubmit)}
                            type="submit"
                            className="mt-4 w-[300px] bg-pink-500 text-white p-2 rounded-md disabled:cursor-not-allowed disabled:bg-gray-400"
                            disabled={!!errors.name?.message || !watchedName}
                        >
                            회원가입 완료
                        </button>
                    )}
                    <button
                        type="button"
                        className="bg-[white] w-full h-[45px] text-[#000000] mt-[20px] rounded-[10px] relative"
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
                        className="text-white mt-[20px] w-full bg-pink-500 rounded-[10px] py-2"
                        onClick={() => navigate('/login')}
                    >
                        로그인
                    </button>
                </div>
            </div>
        </FormProvider>
    );
};

export default MainSignup;

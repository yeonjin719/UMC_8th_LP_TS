import { useFormContext } from 'react-hook-form';
import { SignupForm } from '../../pages/signup/signup';

export default function Step2() {
    const {
        register,
        formState: { errors },
    } = useFormContext<SignupForm>();

    return (
        <div className="w-full flex flex-col items-center gap-3">
            <input
                type="file"
                {...register('profileImage')}
                className="w-full h-10 rounded-md pl-2 bg-white"
            />
            {errors.profileImage && (
                <div className="text-red-500 text-sm">
                    {errors.profileImage.message}
                </div>
            )}

            <input
                type="text"
                placeholder="이름을 입력해주세요!"
                {...register('name')}
                className="w-full h-10 rounded-md pl-2 bg-white"
            />
            {errors.name && (
                <div className="text-red-500 text-sm">
                    {errors.name.message}
                </div>
            )}
        </div>
    );
}

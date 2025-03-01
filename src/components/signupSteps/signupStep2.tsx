import { useFormContext } from 'react-hook-form';
import { SignupForm } from '../../pages/signup/signup';

import defaultProfile from '../../images/default_profile.png';

export default function Step2() {
    const {
        register,
        formState: { errors },
    } = useFormContext<SignupForm>();
    const handleProfileClick = () => {
        const inputFile = document.getElementById(
            'profile-image-input'
        ) as HTMLInputElement;
        inputFile?.click();
    };
    return (
        <div className="w-full flex flex-col items-center gap-3 h-full">
            <img
                src={defaultProfile}
                alt=""
                className="rounded-[50%] mb-[20px]"
                onClick={handleProfileClick}
            />
            <input
                id="profile-image-input"
                type="file"
                accept="image/*"
                {...register('avatar')}
                className="w-full h-10 rounded-md pl-2 bg-white hidden"
            />
            {errors.avatar && (
                <div className="text-red-500 text-sm">
                    {errors.avatar.message}
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

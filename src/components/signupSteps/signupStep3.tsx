import { useFormContext } from 'react-hook-form';
import { SignupForm } from '../../pages/signup/signup';

import defaultProfile from '../../images/default_profile.png';
import useUploadImageNoAuth from '../../hooks/queries/useUploadImageNoAuth';

type TStep3Props = {
    setImageSrc: (imageSrc: string | null | undefined) => void;
    imageSrc: string | null | undefined;
};

export default function Step3({ setImageSrc, imageSrc }: TStep3Props) {
    const {
        register,
        formState: { errors },
    } = useFormContext<SignupForm>();
    const { mutate: postImgMutate } = useUploadImageNoAuth();

    const handleProfileClick = () => {
        const inputFile = document.getElementById(
            'profile-image-input'
        ) as HTMLInputElement;
        inputFile?.click();
    };

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            postImgMutate(file, {
                onSuccess: (data) => {
                    setImageSrc(data.data.imageUrl || null);
                },
            });
        } else {
            alert('Please upload a valid PNG file.');
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-3 h-full">
            <img
                src={imageSrc || defaultProfile}
                alt=""
                className="rounded-[50%] mb-[20px] max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px] object-cover"
                onClick={handleProfileClick}
            />
            <input
                id="profile-image-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
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
                className="w-full h-10 rounded-md pl-2  bg-[#161616] text-white"
            />
            {errors.name && (
                <div className="text-red-500 text-sm">
                    {errors.name.message}
                </div>
            )}
        </div>
    );
}

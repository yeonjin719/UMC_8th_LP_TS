import { useEffect, useRef, useState } from 'react';
import useUserInfo from '../../hooks/queries/useUserInfo';
import defaultImage from '../../images/default_profile.png';
import LikeLps from '../../components/likeLps/likeLps';
import MadeByMeLP from '../../components/madeByMeLP/madeByMeLP';
import { useAuthContext } from '../../context/LogInContext';
import { IoIosSettings } from 'react-icons/io';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { editProfileSchema } from '../../utils/validate';
import { TUserEdit } from '../../types/user';
import { FaCheck } from 'react-icons/fa';
import useEditUserInfo from '../../hooks/queries/useEditUserInfo';
import { queryClient } from '../../main';
import useUploadImage from '../../hooks/queries/useUploadImage';
function MyPage() {
    const { isLogin, userId } = useAuthContext();
    const { useGetMyInfo } = useUserInfo(isLogin, userId);
    const { data: userData } = useGetMyInfo;
    const [info, setInfo] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageSrc, setImageSrc] = useState<null | undefined | string>(
        defaultImage
    );
    const { mutate: patchUserMutate } = useEditUserInfo();
    const { mutate: postImgMutate } = useUploadImage();

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<TUserEdit>({
        mode: 'onChange',
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            name: userData?.data.name,
            avatar: userData?.data.avatar,
            bio: userData?.data.bio,
        },
    });

    useEffect(() => {
        setImageSrc(userData?.data.avatar);
    }, [userData]);

    const watchedName = useWatch({
        control,
        name: 'name',
    });

    const watchedBio = useWatch({
        control,
        name: 'bio',
    });

    useEffect(() => {
        setValue('avatar', userData?.data.avatar as null | string);
        setValue('name', userData?.data.name as string);
        setValue('bio', userData?.data.bio as null | string);
    }, [userData, setValue]);

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

    const onSubmit: SubmitHandler<TUserEdit> = () => {
        patchUserMutate(
            {
                bio: watchedBio,
                name: watchedName,
                avatar: imageSrc || null,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['myInfo'] });
                    setIsEdit(false);
                },
                onError: () => {
                    alert('사용자 정보 수정 중 에러가 발생하였습니다');
                    setIsEdit(false);
                },
            }
        );
    };

    return (
        <div className="w-full h-full flex flex-col p-[20px] items-center">
            {isEdit ? (
                <div className="flex gap-5 justify-center items-center mt-[30px] ">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <img
                        src={imageSrc || defaultImage}
                        onClick={() => fileInputRef.current?.click()}
                        alt="프로필 이미지"
                        className="w-[130px] h-[130px] rounded-[50%] object-cover hover:cursor-pointer"
                    />
                    <form
                        className="flex flex-col relative h-[110px] w-[250px] gap-3"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="flex justify-between w-full items-center">
                            <input
                                type="text"
                                placeholder="닉네임을 입력해주세요"
                                className="text-white w-[220px] px-2 py-1 text-[20px] border border-white rounded-md"
                                {...register('name')}
                            />
                            <button
                                type="submit"
                                disabled={!!errors.name?.message}
                            >
                                <FaCheck size={15} color="white" />
                            </button>
                        </div>

                        <input
                            type="text"
                            placeholder="자기소개를 입력해주세요"
                            className="text-white w-[250px] px-2 py-1 text-[15px] border border-white rounded-md"
                            {...register('bio')}
                        />
                        <div className="text-white flex w-[250px] justify-between pr-1">
                            {userData?.data.email}
                        </div>
                    </form>
                </div>
            ) : (
                <div className="flex gap-5 justify-center items-center mt-[30px]">
                    <img
                        src={userData?.data.avatar || defaultImage}
                        alt="프로필 이미지"
                        className="w-[130px] h-[130px] rounded-[50%] object-cover"
                    />
                    <div className="flex flex-col w-[250px] h-[110px]">
                        <div className="flex justify-between items-center text-white text-[30px]">
                            {userData?.data.name}
                            <IoIosSettings
                                size={20}
                                onClick={() => setIsEdit(true)}
                            />
                        </div>
                        <div className="text-white h-[30.5px]">
                            {userData?.data.bio}
                        </div>
                        <div className="text-white">{userData?.data.email}</div>
                    </div>
                </div>
            )}

            <div className="mt-5 flex w-full items-center justify-center border-t border-[rgba(40,41,46)]">
                <button
                    onClick={() => setInfo(0)}
                    className={`py-2 px-4 text-[17px] h-full whitespace-nowrap ${
                        info === 0
                            ? 'border-t border-white text-white'
                            : 'text-[#38393f]'
                    }`}
                >
                    내가 좋아요 한 LP
                </button>
                <button
                    onClick={() => setInfo(1)}
                    className={`py-2 px-4 text-[17px] whitespace-nowrap ${
                        info === 1
                            ? 'border-t border-white text-white'
                            : 'text-[#38393f]'
                    }`}
                >
                    내가 작성한 LP
                </button>
            </div>

            {info === 0 ? (
                <LikeLps userType={'me'} />
            ) : (
                <MadeByMeLP userId={userData?.data.id as number} />
            )}
        </div>
    );
}

export default MyPage;

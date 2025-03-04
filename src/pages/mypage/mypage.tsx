import { useEffect, useRef, useState } from 'react';
import useUserInfo from '../../hooks/queries/useUserInfo';
import defaultImage from '../../images/default_profile.png';
import LikeLps from '../../components/likeLps/likeLps';
import MadeByMeLP from '../../components/madeByMeLP/madeByMeLP';
import { useAuthContext } from '../../context/LogInContext';
import { IoIosSettings } from 'react-icons/io';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { editProfileSchema } from '../../utils/validate';
import { TUserEdit } from '../../types/user';
import { FaCheck } from 'react-icons/fa';
import useEditUserInfo from '../../hooks/queries/useEditUserInfo';
import { queryClient } from '../../main';
function MyPage() {
    const { isLogin, userId } = useAuthContext();
    const { useGetMyInfo } = useUserInfo(isLogin, userId);
    const { data: userData } = useGetMyInfo;
    const [info, setInfo] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageSrc, setImageSrc] = useState(
        userData?.data.avatar || defaultImage
    );
    const { mutate: patchUserMutate } = useEditUserInfo();
    const {
        register,
        handleSubmit,
        setValue,
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
        setValue('avatar', userData?.data.avatar as null | string);
        setValue('name', userData?.data.name as string);
        setValue('bio', userData?.data.bio as null | string);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setImageSrc(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit: SubmitHandler<TUserEdit> = (submitData) => {
        setIsEdit(false);
        patchUserMutate(
            {
                bio: submitData.bio,
                name: submitData.name,
                avatar: imageSrc,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['myInfo'] });
                },
                onError: () => {
                    alert('사용자 정보 수정 중 에러가 발생하였습니다');
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
                        onChange={handleImageChange}
                    />
                    <img
                        src={imageSrc}
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
                                onClick={handleSubmit(onSubmit)}
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

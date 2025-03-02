import { useRef, useState } from 'react';
import useUserInfo from '../../hooks/queries/useUserInfo';
import defaultImage from '../../images/default_profile.png';
import LikeLps from '../../components/likeLps/likeLps';

import MadeByMeLP from '../../components/madeByMeLP/madeByMeLP';
import { useAuthContext } from '../../context/LogInContext';
function MyPage() {
    const { isLogin } = useAuthContext();
    const [isEdit, setIsEdit] = useState(false);
    const { useGetMyInfo } = useUserInfo(isLogin);
    const { data: userData } = useGetMyInfo;
    const [info, setInfo] = useState(0);
    const [userName, setUserName] = useState(userData?.data.name);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageSrc, setImageSrc] = useState(
        userData?.data.avatar || defaultImage
    );

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };

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
                        alt="임시 이미지"
                        className="w-[100px] h-[100px] rounded-[50%] object-cover hover:cursor-pointer"
                    />
                    <div className="flex flex-col relative h-[100px] w-[144px]">
                        <input
                            type="text"
                            placeholder="닉네임을 입력해주세요"
                            className="text-white absolute top-3 w-[250px] px-2 py-1 text-[20px] border-1 border-white rounded-md"
                            value={userName}
                            onChange={handleChangeInput}
                        />
                        <div className="text-white absolute bottom-4">
                            {userData?.data.email}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex gap-5 justify-center items-center mt-[30px] ">
                    <img
                        src={imageSrc}
                        alt="임시 이미지"
                        className="w-[100px] h-[100px] rounded-[50%] object-cover"
                    />
                    <div className="flex flex-col ">
                        <div className="text-white text-[30px]">
                            {userData?.data.name}
                        </div>
                        <div className="text-white">{userData?.data.email}</div>
                        <div>{userData?.data.avatar}</div>
                    </div>
                </div>
            )}

            <div className="mt-5 flex w-full items-center justify-center relative">
                <button
                    onClick={() => setInfo(0)}
                    className={`${
                        info === 0 ? 'underline' : ''
                    } text-white bg-black py-2 px-4 text-[17px]`}
                >
                    내가 좋아요 한 LP
                </button>
                <button
                    onClick={() => setInfo(1)}
                    className={`${
                        info === 1 ? 'underline' : ''
                    } text-white bg-black py-2 px-4 text-[17px]`}
                >
                    내가 작성한 LP
                </button>
                <button
                    onClick={() => setInfo(2)}
                    className={`${
                        info === 2 ? 'underline' : ''
                    } text-white bg-black py-2 px-4 text-[17px]`}
                >
                    내가 작성한 댓글
                </button>
                {isEdit ? (
                    <button
                        className="absolute right-8 text-white hover:underline"
                        onClick={() => setIsEdit(false)}
                    >
                        수정 완료
                    </button>
                ) : (
                    <button
                        className="absolute right-8 text-white hover:underline"
                        onClick={() => setIsEdit(true)}
                    >
                        프로필 수정
                    </button>
                )}
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

import { useState } from 'react';
import useUserInfo from '../../hooks/queries/useUserInfo';
import defaultImage from '../../images/default_profile.png';
import LikeLps from '../../components/likeLps/likeLps';
import MadeByMeLP from '../../components/madeByMeLP/madeByMeLP';
import { useAuthContext } from '../../context/LogInContext';

function MyPage() {
    const { isLogin, userId } = useAuthContext();

    const { useGetMyInfo } = useUserInfo(isLogin, userId);
    const { data: userData } = useGetMyInfo;
    const [info, setInfo] = useState(0);

    return (
        <div className="w-full h-full flex flex-col p-[20px] items-center">
            <div className="flex gap-5 justify-center items-center mt-[30px] ">
                <img
                    src={userData?.data.avatar || defaultImage}
                    alt="임시 이미지"
                    className="w-[100px] h-[100px] rounded-[50%] object-cover"
                />
                <div className="flex flex-col ">
                    <div className="text-white text-[30px] flex items-center justify-between">
                        {userData?.data.name}
                    </div>
                    <div className="text-white">{userData?.data.email}</div>
                    <div className="text-white">{userData?.data.bio}</div>
                </div>
            </div>

            <div className="mt-5 flex w-full items-center justify-center relative border-t-[1px] border-t-[rgba(40,41,46)]">
                <button
                    onClick={() => setInfo(0)}
                    className={`${
                        info === 0
                            ? 'border-t-[0.5px] border-white text-white'
                            : 'text-[#38393f]'
                    }  bg-black py-2 px-4 text-[17px] h-full whitespace-nowrap`}
                >
                    내가 좋아요 한 LP
                </button>
                <button
                    onClick={() => setInfo(1)}
                    className={`${
                        info === 1
                            ? 'border-t-[0.5px] border-white text-white'
                            : 'text-[#38393f]'
                    }  bg-black py-2 px-4 text-[17px] whitespace-nowrap`}
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

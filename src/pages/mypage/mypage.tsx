import { useState } from 'react';
import useUserInfo from '../../hooks/queries/useUserInfo';
import defaultImage from '../../images/default_profile.png';
import LikeLps from '../../components/likeLps/likeLps';

import MadeByMeLP from '../../components/madeByMeLP/madeByMeLP';
import WriteByMeComment from '../../components/writeByMeComment/writeByMeComment';
function MyPage() {
    const { useGetMyInfo } = useUserInfo();
    const { data: userData } = useGetMyInfo;
    const [info, setInfo] = useState(0);
    return (
        <div className="w-full h-full flex flex-col p-[20px] items-center">
            <div className="flex gap-5 justify-center items-center mt-[30px] ">
                <img
                    src={userData?.profileImageUrl || defaultImage}
                    alt="임시 이미지"
                    className="w-[100px] h-[100px] rounded-[50%] object-cover"
                />
                <div className="flex flex-col ">
                    <div className="text-white text-[30px]">
                        {userData?.name}
                    </div>
                    <div className="text-white">{userData?.email}</div>
                    <div>{userData?.profileImageUrl}</div>
                </div>
            </div>
            <div className="mt-5 flex w-full items-center justify-center">
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
            </div>
            {info === 0 ? (
                <LikeLps />
            ) : info === 1 ? (
                <MadeByMeLP />
            ) : (
                <WriteByMeComment />
            )}
        </div>
    );
}

export default MyPage;

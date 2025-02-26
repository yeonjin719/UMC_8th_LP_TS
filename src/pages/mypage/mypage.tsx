import { useState } from 'react';
import useUserInfo from '../../hooks/queries/useUserInfo';
import defaultImage from '../../images/default_profile.png';
import LikeLps from '../../components/likeLps/likeLps';
import MadeByMeMovies from '../../components/madeByMeMovies/madeByMeMovies';
function MyPage() {
    const accessToken = localStorage.getItem('accessToken') || '';
    const { useGetMyInfo } = useUserInfo(accessToken);
    const { data: userData } = useGetMyInfo;
    const [info, setInfo] = useState(0);
    return (
        <div className="w-full h-full flex flex-col p-[20px] items-center">
            <div className="flex gap-5 justify-center items-center mt-[30px]">
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
                    내가 북마크 한 LP
                </button>
            </div>
            {info === 0 ? <LikeLps /> : <MadeByMeMovies />}
        </div>
    );
}

export default MyPage;

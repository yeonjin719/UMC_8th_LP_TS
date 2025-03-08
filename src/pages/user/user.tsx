import { useState } from 'react';
import defaultImage from '../../images/default_profile.png';
import LikeLps from '../../components/likeLps/likeLps';
import MadeByMeLP from '../../components/madeByMeLP/madeByMeLP';
import { useParams } from 'react-router-dom';
import useGetOtherUser from '../../hooks/queries/useGetOtherUser';

const User = () => {
    const params = useParams();
    const { data: userData } = useGetOtherUser(Number(params.userId));

    const [info, setInfo] = useState(0);

    return (
        <div className="w-full h-full flex flex-col p-[20px] items-center">
            <div className="flex gap-5 justify-center items-center mt-[30px]">
                <img
                    src={userData?.data.avatar || defaultImage}
                    alt="프로필 이미지"
                    className="w-[130px] h-[130px] rounded-[50%] object-cover"
                />
                <div className="flex flex-col w-[250px] h-[110px]">
                    <div className="flex justify-between items-center text-white text-[30px]">
                        {userData?.data.name}
                    </div>
                    <div className="text-white h-[30.5px]">
                        {userData?.data.bio}
                    </div>
                    <div className="text-white">{userData?.data.email}</div>
                </div>
            </div>

            <div className="mt-5 flex w-full items-center justify-center border-t border-[rgba(40,41,46)]">
                <button
                    onClick={() => setInfo(0)}
                    className={`py-2 px-4 text-[17px] h-full whitespace-nowrap ${
                        info === 0
                            ? 'border-t border-white text-white'
                            : 'text-[#38393f]'
                    }`}
                >
                    좋아요 한 LP
                </button>
                <button
                    onClick={() => setInfo(1)}
                    className={`py-2 px-4 text-[17px] whitespace-nowrap ${
                        info === 1
                            ? 'border-t border-white text-white'
                            : 'text-[#38393f]'
                    }`}
                >
                    작성한 LP
                </button>
            </div>
            {info === 0 ? (
                <LikeLps userType={userData?.data.id as number} />
            ) : (
                <MadeByMeLP userId={userData?.data.id as number} />
            )}
        </div>
    );
};

export default User;

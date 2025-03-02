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
            <div className="flex gap-5 justify-center items-center mt-[30px] ">
                <img
                    src={userData?.data.avatar || defaultImage}
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

            <div className="mt-5 flex w-full items-center justify-center relative">
                <button
                    onClick={() => setInfo(0)}
                    className={`${
                        info === 0 ? 'underline' : ''
                    } text-white bg-black py-2 px-4 text-[17px]`}
                >
                    좋아요 한 LP
                </button>
                <button
                    onClick={() => setInfo(1)}
                    className={`${
                        info === 1 ? 'underline' : ''
                    } text-white bg-black py-2 px-4 text-[17px]`}
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

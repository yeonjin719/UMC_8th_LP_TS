import { useNavigate } from 'react-router-dom';
import { TLp } from '../../apis/lp';

import { formatRelativeTime } from '../../utils/transformDate';
import Profile from '../profile/profile';
const LpCard = (data: TLp | undefined) => {
    const navigate = useNavigate();
    return (
        <div
            className="flex flex-col relative w-[220px] h-[140px] bg-gray-800 rounded-[10px] p-[10px]"
            onClick={() => navigate(`/lp/${data?.id}`)}
        >
            <div className="text-black">{data?.title}</div>
            <div>{data?.description}</div>
            <div className="flex justify-between absolute bottom-[10px] left-[10px] right-[10px] ">
                <Profile
                    profile_path={data?.author.profileImageUrl}
                    name={data?.author.name}
                    id={data?.authorId}
                ></Profile>
                <div>{formatRelativeTime(data?.createdAt)}</div>
            </div>
        </div>
    );
};

export default LpCard;

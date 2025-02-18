import { useParams } from 'react-router-dom';
import useGetLPDetails from '../../hooks/queries/useGetLPDetails';
import Profile from '../profile/profile';
import { formatRelativeTime } from '../../utils/transformDate';
import { FaBookmark } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
const LpDetail = () => {
    const { lpId } = useParams();
    const { data } = useGetLPDetails({ lpId: Number(lpId) });
    return (
        <div className="flex w-full h-full items-center flex-col p-[30px]">
            <div className="flex flex-col w-[80%] gap-[15px] justify-center items-center bg-gray-900 rounded-[15px] p-[30px]">
                <div className="flex gap-[40px] w-full justify-between">
                    <Profile
                        profile_path={data?.author.profileImageUrl}
                        id={data?.author.id}
                        name={data?.author.name}
                    ></Profile>
                    <div className="text-white">
                        {formatRelativeTime(data?.createdAt)}
                    </div>
                </div>
                <div className="relative w-full">
                    <div className="text-white text-[25px]">
                        제목: {data?.title}
                    </div>
                    <div className="absolute flex gap-[15px] right-0 top-[10px]">
                        <FaBookmark color="white" size={20} />
                        <FaRegTrashAlt color="white" size={20} />
                    </div>
                </div>

                <img
                    src="https://pbs.twimg.com/media/GAkrg_oa0AAtFsu.jpg:large"
                    alt=""
                    className="w-full"
                />
                <div className="text-white ">{data?.description}</div>
                <div className="flex items-center gap-[10px]">
                    <FaHeart color="white" size={30} />
                    <div className="text-white text-[25px]">
                        {data?.totalLikes}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LpDetail;

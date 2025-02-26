import { useNavigate } from 'react-router-dom';
import { TLp } from '../../apis/lp';
import LP from '../../../public/lp.png';

import { formatRelativeTime } from '../../utils/transformDate';
import Profile from '../profile/profile';

const LpCard = (data: TLp | undefined) => {
    const navigate = useNavigate();
    return (
        <div
            className="flex relative w-[80%] h-[120px] bg-[rgba(40,41,46)] rounded-[10px] p-[15px]"
            onClick={() => navigate(`/lp/${data?.id}`)}
        >
            {!data?.image ? (
                <div className="relative h-[90px] min-w-[130px]">
                    <img
                        src={
                            'https://pimg.mk.co.kr/news/cms/202501/24/news-p.v1.20250124.d3f2ccafca8440f2be4539451f2b132f_P1.jpg'
                        }
                        alt=""
                        className="absolute h-full object-cover z-1 w-[90px]"
                    />
                    <img
                        src={data?.image || LP}
                        alt=""
                        className="absolute h-full w-[90px] right-[0px]"
                    />
                </div>
            ) : (
                <img src={data?.image || LP} alt="" className="h-full" />
            )}

            <div className="w-full flex flex-col ml-2">
                <div className="flex justify-between">
                    <div className="text-white font-bold text-[20px]">
                        {data?.title}
                    </div>
                    <div className="text-white justify-end">
                        {formatRelativeTime(data?.createdAt)}
                    </div>
                </div>
                <div>
                    <div className="text-white">{data?.description}</div>
                </div>
                <div className="flex text-white justify-end">
                    <Profile
                        profile_path={data?.author.profileImageUrl}
                        name={data?.author.name}
                        id={data?.authorId}
                    ></Profile>
                </div>
            </div>
        </div>
    );
};

export default LpCard;

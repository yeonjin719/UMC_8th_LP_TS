import { useNavigate } from 'react-router-dom';
import { TLp } from '../../apis/lp';
import LP from '../../../public/lp.png';

import { formatRelativeTime } from '../../utils/transformDate';
import Profile from '../common/profile/profile';

const LpCard = (data: TLp | undefined) => {
    const navigate = useNavigate();
    return (
        <div
            className="flex relative max-w-[800px] w-[70%] min-w-[400px] h-[120px] bg-[rgba(40,41,46)] rounded-[10px] py-[15px] px-[20px] justify-between gap-2"
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

            <div className="flex min-w-[60%] w-[80%] flex-col">
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
                {data?.comment ? (
                    <div className="flex text-white pt-2 w-full justify-between ">
                        <div className="text-white flex w-[80%] min-w-[60%]">
                            "
                            <span className="overflow-hidden w-[90%] text-ellipsis whitespace-nowrap">
                                {data.comment}
                            </span>
                            "
                        </div>

                        <Profile
                            profile_path={data?.author.profileImageUrl}
                            name={data?.author.name}
                            id={data?.authorId}
                        ></Profile>
                    </div>
                ) : (
                    <div className="flex text-white pt-2 justify-end ">
                        <Profile
                            profile_path={data?.author.profileImageUrl}
                            name={data?.author.name}
                            id={data?.authorId}
                        ></Profile>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LpCard;

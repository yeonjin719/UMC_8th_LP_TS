import { useNavigate } from 'react-router-dom';

import LP from '../../images/lp.png';
import LPCover from '../../images/lp_default.svg';
import { formatRelativeTime } from '../../utils/transformDate';
import { TLp } from '../../types/lp';
import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const LpCard = (data: TLp | undefined) => {
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(LPCover);
    useEffect(() => {
        if (data?.thumbnail) {
            setImageSrc(data?.thumbnail);
        }
    }, [data]);
    return (
        <div
            className="flex relative max-w-[200px] max-h-[200px]"
            onClick={() => navigate(`/lp/${data?.id}`)}
        >
            <div
                className={`relative w-[200px] h-[200px] group hover:transition-transform hover:scale-120 hover:z-2 duration-150 ease-in-out hover:w-[250px]`}
            >
                <div className="group-hover:bg-gradient-to-b from-black/40 to-black absolute group-hover:z-3 w-[200px] h-[200px] top-0 left-0 "></div>
                <img
                    src={imageSrc}
                    alt="lp 커버 이미지"
                    className="absolute h-full object-cover z-1 max-w-[200px] min-w-[200px] group-hover:left-0"
                />
                <img
                    src={LP}
                    alt=""
                    className="absolute h-full max-w-[200px] min-w-[200px] object-cover group-hover:right-0"
                />
                <div className="hidden group-hover:flex w-[200px] flex-col absolute bottom-0 z-4 p-4">
                    <div className="text-white font-bold text-[14px] max-w-[80%]">
                        {data?.title}
                    </div>
                    <div className="text-white justify-end whitespace-nowrap text-[15px]">
                        {formatRelativeTime(data?.createdAt)}
                    </div>
                    <div className="absolute flex items-center justify-center gap-1 right-5 bottom-4 ">
                        <FaHeart size={10} color="white"></FaHeart>
                        <div className="text-white text-[13px]">
                            {data?.likes.length}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LpCard;

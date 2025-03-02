import { useNavigate } from 'react-router-dom';

import LP from '../../images/lp.png';
import LPCover from '../../images/lp_default.svg';
import { formatRelativeTime } from '../../utils/transformDate';
import { TLp } from '../../types/lp';
import { useEffect, useState } from 'react';
import { checkThumbnail } from '../../utils/isValidImageUrl';

const LpCard = (data: TLp | undefined) => {
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(LPCover);
    useEffect(() => {
        const validateThumbnail = async () => {
            if (data?.thumbnail) {
                const isValid = await checkThumbnail(data.thumbnail);
                if (isValid) {
                    setImageSrc(data.thumbnail);
                }
            }
        };

        validateThumbnail();
    }, [data?.thumbnail]);
    return (
        <div
            className="flex relative max-w-[800px] w-[70%] min-w-[400px] h-[120px] bg-[rgba(40,41,46)] rounded-[10px] py-[15px] px-[20px] justify-between gap-2"
            onClick={() => navigate(`/lp/${data?.id}`)}
        >
            {data?.thumbnail ? (
                <div className={`relative h-[90px] min-w-[130px]`}>
                    <img
                        src={imageSrc}
                        alt="lp 커버 이미지"
                        className="absolute h-full object-cover z-1 max-w-[90px] min-w-[90px]"
                        onError={() => setImageSrc(LPCover)}
                    />
                    <img
                        src={LP}
                        alt="lp 이미지"
                        className={`absolute h-full w-[90px] right-[0px]`}
                    />
                </div>
            ) : (
                <img src={LP} alt="" className="h-full" />
            )}

            <div className="flex min-w-[60%] w-[80%] flex-col">
                <div className="flex justify-between">
                    <div className="text-white font-bold text-[20px] text-ellipsis whitespace-nowrap max-w-[80%] overflow-hidden">
                        {data?.title}
                    </div>
                    <div className="text-white justify-end">
                        {formatRelativeTime(data?.createdAt)}
                    </div>
                </div>
                <div>
                    <div className="text-white text-ellipsis whitespace-nowrap max-w-full overflow-hidden">
                        {data?.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LpCard;

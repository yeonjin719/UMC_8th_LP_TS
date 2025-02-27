import Profile from '../common/profile/profile.js';
import Error from '../error/error.jsx';

import { Link } from 'react-router-dom';
import { TMovieCreditResponse } from '../../apis/movie.js';

interface CreditInfoListProps {
    creditData: TMovieCreditResponse | undefined;
    movieId: string;
}

const CreditInfoList = ({ creditData, movieId }: CreditInfoListProps) => {
    if (!creditData) {
        console.log('데이터가 없습니다');
        return <Error />;
    }

    const someData = creditData?.cast.slice(0, 5);

    return (
        <div className="flex flex-col relative m-5">
            <div className="mt-6 text-white text-xl font-bold w-[130px] whitespace-nowrap overflow-hidden text-ellipsis">
                감독/출연
            </div>
            <Link
                to={`/credit/${movieId}`}
                className="absolute top-[35px] right-[25px] text-white bg-black no-underline p-2"
            >
                더보기
            </Link>
            <div className="flex w-full text-black text-xs flex-wrap gap-2">
                {someData.map((cast, idx) => (
                    <Profile key={idx} {...cast} />
                ))}
            </div>
        </div>
    );
};

export default CreditInfoList;

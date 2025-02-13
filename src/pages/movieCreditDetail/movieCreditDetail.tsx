import Profile from '../../components/profile/profile';
import { useParams } from 'react-router-dom';
import Error from '../../components/error/error';
import Lottie from 'react-lottie-player';
import loadingJson from '../../lottie/Animation-loading.json';
import useGetCredit from '../../hooks/queries/useGetCredit';

const MovieCreditDetail = () => {
    const { movieID } = useParams<{ movieID: string }>();

    const { data, error, isLoading } = useGetCredit(movieID!);

    if (error) {
        console.log('Error fetching data', error);
        return <Error />;
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-full text-white text-2xl">
                <Lottie loop animationData={loadingJson} play />
            </div>
        );
    }

    return (
        <div className="flex">
            <div className="flex w-full flex-wrap gap-2 justify-center text-black text-xs">
                {data?.cast.map((cast) => (
                    <Profile {...cast} key={cast.id} />
                ))}
                {data?.crew.map((crew) => (
                    <Profile {...crew} key={crew.id} />
                ))}
            </div>
        </div>
    );
};

export default MovieCreditDetail;

import Error from '../error/error.jsx';
import ClipLoader from 'react-spinners/ClipLoader';
import useGetSingleMovie from '../../hooks/queries/useGetSingleMovie.js';

interface Props {
    movieId: string;
}
function MovieInfoCard(props: Props) {
    const { movieId } = props;
    const { data, error, isLoading } = useGetSingleMovie(movieId);

    if (error) {
        console.log('데이터가 없습니다');
        return <Error />;
    }
    if (isLoading) {
        return (
            <div className="flex justify-center items-center w-full h-[300px] text-white">
                <ClipLoader color="white" />
            </div>
        );
    }
    if (!data) {
        console.log('데이터가 없습니다');
        return <Error />;
    }

    const {
        title,
        vote_average,
        release_date,
        overview,
        tagline,
        runtime,
        backdrop_path,
        poster_path,
        genres,
        origin_country,
    } = data;

    let backgroundImageUrl = '';
    if (backdrop_path === null) {
        backgroundImageUrl = `https://image.tmdb.org/t/p/original${poster_path}`;
    } else {
        backgroundImageUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    }
    const formattedReleaseDate = release_date?.slice(0, 4);
    const formattedRuntime = Math.floor(runtime / 60);
    const formattedRuntimeMin = runtime - formattedRuntime * 60;
    return (
        <div className="relative w-full z-4 border-b border-[#202020] min-[1080px]:h-[300px] bg-cover bg-center">
            <img
                src={backgroundImageUrl}
                alt=""
                className="min-[1080px]:absolute min-[1080px]:top-0 min-[1080px]:left-0 w-full h-[300px] object-cover"
            />
            <div className="absolute z-8 top-0 left-0 w-full h-[300px] bg-gradient-to-r from-black to-transparent opacity-60 md:opacity-80"></div>
            <div className="min-[1080px]:absolute min-[1080px]:top-[30px] min-[1080px]:left-0 flex relative flex-col justify-center min-[1080px]:w-1/2 h-[300px] z-20 gap-1 w-full md:h-auto md:mt-2 md:ml-0">
                <div className="z-9 text-white text-3xl font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                    {title}
                </div>
                <div className="flex gap-2 text-white flex-wrap w-full z-5">
                    <span>평균 {vote_average}</span>·
                    <span>{formattedReleaseDate}</span>·
                    <span>
                        {formattedRuntime}시간 {formattedRuntimeMin}분
                    </span>
                    ·<span>{genres?.[0]?.name}</span>·
                    <span>{origin_country?.[0]}</span>
                </div>
                <div className="text-white text-xl italic my-2 z-5">
                    {tagline}
                </div>
                <div className="text-[#babac1] z-5 text-sm max-h-[150px] overflow-hidden">
                    {overview}
                </div>
            </div>
        </div>
    );
}

export default MovieInfoCard;

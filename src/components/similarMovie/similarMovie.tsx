import MovieCard from '../movieCard/movieCard';
import ClipLoader from 'react-spinners/ClipLoader';
import Error from '../error/error';
import useGetSimilarMovie from '../../hooks/queries/useGetSimilarMovie';

const SimilarMovie = ({ id }: { id: string }) => {
    const { data, error, isLoading } = useGetSimilarMovie(id);

    if (error) {
        return <Error />;
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-[400px] text-white text-[20px] text-center">
                <ClipLoader color="white" />
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full text-white mb-[30px]">
            <div className="flex w-[95%] ml-[30px] mt-[30px] text-white text-[20px] self-center">
                비슷한 영화
            </div>
            <div className="flex flex-wrap justify-center gap-[20px] w-full mt-[30px] text-white">
                {data?.results.map((movie) => (
                    <MovieCard key={movie.id} {...movie} />
                ))}
            </div>
        </div>
    );
};

export default SimilarMovie;

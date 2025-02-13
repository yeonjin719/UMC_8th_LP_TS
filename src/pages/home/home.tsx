import MovieCardBackdrop from '../../components/movieCard_backdrop/movieCardBackdrop';
import { TMovieSingleResponse } from '../../apis/movie';

import Error from '../../components/error/error';
import CardListSkeleton from '../../components/movieCard_backdrop/Skeleton/card-list-skeleton';
import useGetTrendingMovies from '../../hooks/queries/useGetTrendingMovies';

const HomePage = () => {
    const { data, error, isLoading } = useGetTrendingMovies();

    if (error) {
        return <Error />;
    }

    return (
        <div className="flex flex-col items-center border-t border-gray-800">
            <div className="text-white text-2xl mt-[20px] mb-[20px]">
                Trending movies
            </div>
            {isLoading ? (
                <div className="flex flex-wrap gap-5 justify-center mb-7 w-9/10">
                    <CardListSkeleton number={20} />
                </div>
            ) : (
                <div className="flex flex-wrap gap-5 justify-center mb-7 w-9/10">
                    {data?.results.map((movie: TMovieSingleResponse) => (
                        <MovieCardBackdrop key={movie.id} {...movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;

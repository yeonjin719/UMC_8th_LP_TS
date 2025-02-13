import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useGetInfiniteMovies from '../../hooks/queries/useGetInfiniteMovies';
import { useInView } from 'react-intersection-observer';

import Error from '../../components/error/error';
import MovieCard from '../../components/movieCard/movieCard';

import ClipLoader from 'react-spinners/ClipLoader';
import CardListSkeleton from '../../components/movieCard/Skeleton/card-list-skeleton';

const MoviesCategory = () => {
    const { category } = useParams<{
        category: 'now_playing' | 'popular' | 'top_rated' | 'upcoming';
    }>();

    const categoryToKorean = {
        now_playing: '현재 상영중인 영화',
        popular: '인기있는 영화',
        top_rated: '높은 평가를 받은 영화',
        upcoming: '개봉 예정 영화',
    };

    const koreanTranslation = category
        ? categoryToKorean[category]
        : '카테고리 없음';

    const {
        data: movies,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isPending,
        isFetching,
    } = useGetInfiniteMovies(category!);

    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView && !isFetching && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    if (error) {
        console.error('에러 발생:', error);
        return <Error />;
    }

    return (
        <div className="flex flex-col items-center w-full pl-[20px] pr-[20px]">
            <div className="text-white text-2xl font-bold mb-4 ml-5 self-start">
                {koreanTranslation}
            </div>
            <div className="flex flex-wrap justify-center gap-5 mt-5">
                {(isLoading || isPending) && (
                    <CardListSkeleton number={20}></CardListSkeleton>
                )}
                {movies?.pages.map((page) =>
                    page.results.map((movie) => (
                        <MovieCard key={movie.id} {...movie} />
                    ))
                )}
            </div>
            <div ref={ref} className="mt-12">
                {isFetching && movies && <ClipLoader color={'#fff'} />}
            </div>
        </div>
    );
};

export default MoviesCategory;

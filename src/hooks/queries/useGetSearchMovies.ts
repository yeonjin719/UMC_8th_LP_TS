import { useQuery } from '@tanstack/react-query';
import { getSearchMovie } from '../../apis/movie';
import { TMovieTotalResponse } from '../../apis/movie';

function useGetSearchMovies(keyword: string) {
    return useQuery<TMovieTotalResponse>({
        queryKey: ['searchMovie', keyword],
        queryFn: () => getSearchMovie(keyword, 1),
        enabled: !!keyword,
    });
}

export default useGetSearchMovies;

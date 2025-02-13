import { useQuery } from '@tanstack/react-query';
import { getMovieVideos } from '../../apis/movie';

function useGetMovieVideo(movieID: string) {
    return useQuery({
        queryKey: ['YouTubemovieId', movieID],
        queryFn: () => getMovieVideos(movieID || ''),
        enabled: !!movieID,
    });
}

export default useGetMovieVideo;

import { useInfiniteQuery } from '@tanstack/react-query';
import { getOtherUserLikesMeLPs } from '../../apis/lp';
import { TGetLPsResponse, TGetPageWithUserId } from '../../types/lp';

function useGetOtherUserLikeLP({
    search,
    order,
    userType,
    userId,
}: Omit<TGetPageWithUserId, 'cursor' | 'userType'> & {
    userType?: 'me' | number;
}) {
    return useInfiniteQuery({
        queryKey: ['getOtherUserLikesLps', search, order, userId],
        queryFn: ({ pageParam = 0 }): Promise<TGetLPsResponse> =>
            getOtherUserLikesMeLPs({
                cursor: pageParam,
                search,
                order,
                userId,
            }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) =>
            lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
        enabled: typeof userType === 'number',
    });
}

export default useGetOtherUserLikeLP;

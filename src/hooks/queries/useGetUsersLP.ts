import { useInfiniteQuery } from '@tanstack/react-query';
import { getSomeUsersLPs } from '../../apis/lp';
import { TGetLPsResponse, TGetPageWithUserId } from '../../types/lp';

function useGetUsersLP({
    search,
    order,
    userId,
}: Omit<TGetPageWithUserId, 'cursor'>) {
    return useInfiniteQuery({
        queryKey: ['getLikesLps', search, order, userId],
        queryFn: ({ pageParam = 0 }): Promise<TGetLPsResponse> =>
            getSomeUsersLPs({ cursor: pageParam, search, order, userId }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) =>
            lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
        enabled: !!userId,
    });
}

export default useGetUsersLP;

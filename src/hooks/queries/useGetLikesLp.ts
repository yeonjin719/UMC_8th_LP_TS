import { useInfiniteQuery } from '@tanstack/react-query';
import { getLikesMeLPs } from '../../apis/lp';
import { TGetLPsRequest, TGetLPsResponse } from '../../types/lp';

function useGetLikesMeLps({
    search,
    order,
    userType,
}: Omit<TGetLPsRequest, 'cursor' | 'userType'> & { userType?: 'me' | number }) {
    return useInfiniteQuery({
        queryKey: ['getLikesMeLps', search, order],
        queryFn: ({ pageParam = 0 }): Promise<TGetLPsResponse> =>
            getLikesMeLPs({ cursor: pageParam, search, order }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) =>
            lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
        enabled: userType === 'me',
    });
}

export default useGetLikesMeLps;

import { queryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { getComments } from '../../apis/lp';
import { TGetCommentsRequest, TLPComments } from '../../types/lp';

function useGetComments({ lpsId, limit, order }: TGetCommentsRequest) {
    return useInfiniteQuery({
        queryKey: ['getComments', lpsId, order],
        queryFn: ({ pageParam = 0 }): Promise<TLPComments> =>
            getComments({ lpsId, cursor: pageParam, limit, order }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
        },
        ...queryOptions,
    });
}

export default useGetComments;

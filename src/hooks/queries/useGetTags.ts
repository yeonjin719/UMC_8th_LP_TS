import { queryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { getTags } from '../../apis/lp';
import { TTagList, TTagsListResponse } from '../../types/lp';
import { TOrder } from '../../constants/enum';

function useGetTags({ limit, search }: TTagList) {
    return useInfiniteQuery({
        queryKey: ['getTags', search],
        queryFn: ({ pageParam = 0 }): Promise<TTagsListResponse> =>
            getTags({
                cursor: pageParam,
                limit: limit,
                search,
                order: TOrder.최신순,
            }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
        },
        ...queryOptions,
    });
}

export default useGetTags;

import { queryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { getLPWithTag } from '../../apis/lp';
import { TSearchEnum } from '../../constants/enum';
import { TGetLPsRequest, TGetLPsResponse } from '../../types/lp';

function useGetLPWithTag({ search, order, tagName, type }: TGetLPsRequest) {
    return useInfiniteQuery({
        queryKey: ['getLpsWithTag', search, order, tagName],
        queryFn: ({ pageParam = 0 }): Promise<TGetLPsResponse> =>
            getLPWithTag({ cursor: pageParam, search, order, tagName }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
        },
        enabled: type === TSearchEnum.TAG && !!tagName,
        ...queryOptions,
    });
}

export default useGetLPWithTag;

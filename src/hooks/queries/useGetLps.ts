import { queryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { getLPs } from '../../apis/lp';
import { TSearchEnum } from '../../constants/enum';
import { TGetLPsRequest, TGetLPsResponse } from '../../types/lp';

function useGetLps({ search, order, type }: TGetLPsRequest) {
    return useInfiniteQuery({
        queryKey: ['getLps', search, order],
        queryFn: ({ pageParam = 0 }): Promise<TGetLPsResponse> =>
            getLPs({ cursor: pageParam, search, order }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
        },
        enabled: type === TSearchEnum.TITLE,
        ...queryOptions,
    });
}

export default useGetLps;

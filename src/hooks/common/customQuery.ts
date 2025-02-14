import {
    type MutationFunction,
    type QueryFunction,
    type QueryKey,
    useMutation,
    useQuery,
    type UseQueryResult,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type {
    TUseMutationCustomOptions,
    TUseQueryCustomOptions,
} from '../../types/common';

export function useCoreQuery<TQueryFnData, TData = TQueryFnData>(
    keyName: QueryKey,
    query: QueryFunction<TQueryFnData, QueryKey>,
    options?: TUseQueryCustomOptions<TQueryFnData, TData>
): UseQueryResult<TData, AxiosError> {
    return useQuery({
        queryKey: keyName,
        queryFn: query,
        ...options,
    });
}

export function useCoreMutation<T, U>(
    mutation: MutationFunction<T, U>,
    options?: TUseMutationCustomOptions
) {
    return useMutation({
        mutationFn: mutation,
        ...options,
    });
}

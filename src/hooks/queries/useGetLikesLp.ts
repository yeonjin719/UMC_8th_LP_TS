import { getLikesMeLPs } from '../../apis/lp';
import { TGetLPsRequest, TGetLPsResponse } from '../../types/lp';
import { useCoreQuery } from '../common/customQuery';

function useGetLikesMeLps({ cursor, search, order }: TGetLPsRequest) {
    return useCoreQuery<TGetLPsResponse>(
        ['getLikesMeLps', cursor, search, order],
        () => getLikesMeLPs({ cursor, search, order })
    );
}

export default useGetLikesMeLps;

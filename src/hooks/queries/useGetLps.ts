import { getLPs } from '../../apis/lp';
import { TGetLPsRequest, TGetLPsResponse } from '../../types/lp';
import { useCoreQuery } from '../common/customQuery';

function useGetLps({ cursor, search, order }: TGetLPsRequest) {
    return useCoreQuery<TGetLPsResponse>(
        ['getLps', cursor, search, order],
        () => getLPs({ cursor, search, order })
    );
}

export default useGetLps;

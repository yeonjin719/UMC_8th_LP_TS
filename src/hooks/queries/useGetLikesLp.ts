import { getLikesMeLPs } from '../../apis/lp';
import { TGetLPsRequest, TGetLPsResponse } from '../../types/lp';
import { useCoreQuery } from '../common/customQuery';
type TUseGetLikesMeLpsProps = Omit<TGetLPsRequest, 'userType'> & {
    userType?: 'me' | number;
};

function useGetLikesMeLps({
    cursor,
    search,
    order,
    userType,
}: TUseGetLikesMeLpsProps) {
    return useCoreQuery<TGetLPsResponse>(
        ['getLikesMeLps', cursor, search, order],
        () => getLikesMeLPs({ cursor, search, order }),
        {
            enabled: userType === 'me',
        }
    );
}

export default useGetLikesMeLps;

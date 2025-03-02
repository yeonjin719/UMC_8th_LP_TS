import { getOtherUserLikesMeLPs } from '../../apis/lp';
import { TGetLPsResponse, TGetOtherUserLikeLPRequest } from '../../types/lp';
import { useCoreQuery } from '../common/customQuery';
type TUseGetLikesMeLpsProps = Omit<TGetOtherUserLikeLPRequest, 'userType'> & {
    userType?: 'me' | number;
};

function useGetOtherUserLikeLP({
    cursor,
    search,
    order,
    userType,
    userId,
}: TUseGetLikesMeLpsProps) {
    return useCoreQuery<TGetLPsResponse>(
        ['getLikesLps', cursor, search, order, userId],
        () => getOtherUserLikesMeLPs({ cursor, search, order, userId }),
        {
            enabled: typeof userType === 'number',
        }
    );
}

export default useGetOtherUserLikeLP;

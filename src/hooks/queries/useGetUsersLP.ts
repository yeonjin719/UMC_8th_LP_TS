import { getSomeUsersLPs } from '../../apis/lp';
import { TGetLPsResponse, TGetPageWithUserId } from '../../types/lp';
import { useCoreQuery } from '../common/customQuery';
function useGetUsersLP({ cursor, search, order, userId }: TGetPageWithUserId) {
    return useCoreQuery<TGetLPsResponse>(
        ['getLikesLps', cursor, search, order, userId],
        () => getSomeUsersLPs({ cursor, search, order, userId }),
        {
            enabled: !!userId,
        }
    );
}

export default useGetUsersLP;

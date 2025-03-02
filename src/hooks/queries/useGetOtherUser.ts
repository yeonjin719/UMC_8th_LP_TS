import { getOtherUserInfo } from '../../apis/user';
import { useCoreQuery } from '../common/customQuery';

export default function useGetOtherUser(userId: number) {
    return useCoreQuery(
        ['userInfo', userId],
        () => getOtherUserInfo({ userId }),
        {
            staleTime: 5 * 60 * 1000,
            enabled: !!userId,
        }
    );
}

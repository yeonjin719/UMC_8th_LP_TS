import { getMyInfo } from '../../apis/user';
import { useCoreQuery } from '../common/customQuery';

export default function useUserInfo(accessToken: string) {
    const useGetMyInfo = useCoreQuery(
        ['myInfo'],
        () => getMyInfo(accessToken),
        {
            enabled: !!accessToken,
            staleTime: 5 * 60 * 1000,
        }
    );
    return { useGetMyInfo };
}

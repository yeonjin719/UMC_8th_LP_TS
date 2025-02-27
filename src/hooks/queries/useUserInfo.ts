import { getMyInfo } from '../../apis/user';
import { useCoreQuery } from '../common/customQuery';

export default function useUserInfo() {
    const useGetMyInfo = useCoreQuery(['myInfo'], () => getMyInfo(), {
        staleTime: 5 * 60 * 1000,
    });
    return { useGetMyInfo };
}

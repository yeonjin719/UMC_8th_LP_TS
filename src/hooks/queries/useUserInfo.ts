import { getMyInfo } from '../../apis/user';
import { useCoreQuery } from '../common/customQuery';

export default function useUserInfo(isLogin: boolean, userId: number) {
    const useGetMyInfo = useCoreQuery(['myInfo', userId], () => getMyInfo(), {
        staleTime: 5 * 60 * 1000,
        enabled: !!isLogin,
    });
    return { useGetMyInfo };
}

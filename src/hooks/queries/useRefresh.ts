import { Refresh } from '../../apis/auth';
import { useCoreQuery } from '../common/customQuery';

const useRefreshToken = () => {
    return useCoreQuery(['refresh'], () => Refresh());
};

export default useRefreshToken;

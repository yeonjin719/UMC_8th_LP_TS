import { useCoreMutation } from '../common/customQuery';
import { patchUserInfo } from '../../apis/user';

const useEditUserInfo = () => {
    return useCoreMutation(patchUserInfo);
};

export default useEditUserInfo;

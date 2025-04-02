import { useCoreMutation } from '../common/customQuery';
import { uploadNoAuthImage } from '../../apis/lp';

const useUploadImageNoAuth = () => {
    return useCoreMutation(uploadNoAuthImage);
};

export default useUploadImageNoAuth;

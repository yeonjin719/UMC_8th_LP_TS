import { useCoreMutation } from '../common/customQuery';
import { uploadImage } from '../../apis/lp';

const useUploadImage = () => {
    return useCoreMutation(uploadImage);
};

export default useUploadImage;

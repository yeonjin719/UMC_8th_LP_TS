import { useCoreMutation } from '../common/customQuery';
import { patchComment } from '../../apis/lp';

const useChangeComment = () => {
    return useCoreMutation(patchComment);
};

export default useChangeComment;

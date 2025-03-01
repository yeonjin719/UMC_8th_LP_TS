import { useCoreMutation } from '../common/customQuery';
import { postComment } from '../../apis/lp';

const usePostComment = () => {
    return useCoreMutation(postComment);
};

export default usePostComment;

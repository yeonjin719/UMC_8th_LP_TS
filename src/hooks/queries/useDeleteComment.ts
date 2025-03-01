import { useCoreMutation } from '../common/customQuery';
import { deleteComment } from '../../apis/lp';

const useDeleteComment = () => {
    return useCoreMutation(deleteComment);
};

export default useDeleteComment;

import { useCoreMutation } from '../common/customQuery';
import { deleteLikeLP } from '../../apis/lp';

const useDeleteLikeLP = () => {
    return useCoreMutation(deleteLikeLP);
};

export default useDeleteLikeLP;

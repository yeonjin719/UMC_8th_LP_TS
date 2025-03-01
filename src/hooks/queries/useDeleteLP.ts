import { useCoreMutation } from '../common/customQuery';
import { deleteLP } from '../../apis/lp';

const useDeleteLP = () => {
    return useCoreMutation(deleteLP);
};

export default useDeleteLP;

import { useCoreMutation } from '../common/customQuery';
import { postLP } from '../../apis/lp';

const usePostLP = () => {
    return useCoreMutation(postLP);
};

export default usePostLP;

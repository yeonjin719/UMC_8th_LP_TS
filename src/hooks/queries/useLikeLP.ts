import { useCoreMutation } from '../common/customQuery';
import { postLikeLP } from '../../apis/lp';

const useLikeLP = () => {
    return useCoreMutation(postLikeLP);
};

export default useLikeLP;

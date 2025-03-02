import { useCoreMutation } from '../common/customQuery';
import { patchLP } from '../../apis/lp';

const usePatchLP = () => {
    return useCoreMutation(patchLP);
};

export default usePatchLP;

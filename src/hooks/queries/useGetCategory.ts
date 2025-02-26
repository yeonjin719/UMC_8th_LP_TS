import { GetCategories } from '../../apis/categories';
import { useCoreQuery } from '../common/customQuery';

function useGetCategory() {
    return useCoreQuery(['getAllCategories'], () => GetCategories());
}

export default useGetCategory;

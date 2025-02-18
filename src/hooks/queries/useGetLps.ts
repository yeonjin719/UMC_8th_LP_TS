import { GetAllLps } from '../../apis/lp';
import { useCoreQuery } from '../common/customQuery';

function useGetLps({ categoryId }: { categoryId: number }) {
    return useCoreQuery(
        ['getLps', categoryId],
        () => GetAllLps({ categoryId }),
        {
            enabled: !!categoryId,
        }
    );
}

export default useGetLps;

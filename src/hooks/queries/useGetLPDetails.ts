import { GetLpDetails } from '../../apis/lp';
import { useCoreQuery } from '../common/customQuery';

function useGetLPDetails({ lpId }: { lpId: number }) {
    return useCoreQuery(['getLps', lpId], () => GetLpDetails({ id: lpId }), {
        enabled: !!lpId,
    });
}

export default useGetLPDetails;

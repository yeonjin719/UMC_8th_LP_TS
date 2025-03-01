import { getLPs } from '../../apis/lp';
import { TSearchEnum } from '../../constants/enum';
import { TGetLPsRequest, TGetLPsResponse } from '../../types/lp';
import { useCoreQuery } from '../common/customQuery';

function useGetLps({ cursor, search, order, type }: TGetLPsRequest) {
    return useCoreQuery<TGetLPsResponse>(
        ['getLps', cursor, search, order],
        () => getLPs({ cursor, search, order }),
        {
            enabled: type === TSearchEnum.TITLE,
        }
    );
}

export default useGetLps;

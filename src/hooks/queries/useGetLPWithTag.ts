import { getLPWithTag } from '../../apis/lp';
import { TSearchEnum } from '../../constants/enum';
import { TGetLPsRequest, TGetLPsResponse } from '../../types/lp';
import { useCoreQuery } from '../common/customQuery';

function useGetLPWithTag({
    cursor,
    search,
    order,
    tagName,
    type,
}: TGetLPsRequest) {
    return useCoreQuery<TGetLPsResponse>(
        ['getLpsWithTag', cursor, search, order, tagName],
        () => getLPWithTag({ cursor, search, order, tagName }),
        {
            enabled: type === TSearchEnum.TAG,
        }
    );
}

export default useGetLPWithTag;

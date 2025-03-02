import { useEffect, useState } from 'react';
import useGetLikesMeLps from '../../hooks/queries/useGetLikesLp';
import LpCard from '../LpCard/LpCard';
import { TOrder, TOrderLabel } from '../../constants/enum';
import Order from '../common/order/order';
import useGetOtherUserLikeLP from '../../hooks/queries/useGetOtherUserLikesLP';
import { useInView } from 'react-intersection-observer';
import ClipLoader from 'react-spinners/ClipLoader';
type TLikeLpsProps = {
    userType: 'me' | number;
};

const LikeLps = ({ userType }: TLikeLpsProps) => {
    const [order, setOrder] = useState<keyof typeof TOrderLabel>(
        TOrder.NEWEST_FIRST
    );

    const {
        data: meLikeData,
        fetchNextPage: fetchNextPageMe,
        hasNextPage: hasNextPageMe,
        isFetching: isFetchingMe,
    } = useGetLikesMeLps({
        order,
        userType,
    });

    const {
        data: otherUserLikeData,
        fetchNextPage: fetchNextPageOther,
        hasNextPage: hasNextPageOther,
        isFetching: isFetchingOther,
    } = useGetOtherUserLikeLP({
        order,
        userType,
        userId: userType as number,
    });
    const { ref, inView } = useInView({
        threshold: 0,
    });
    useEffect(() => {
        if (inView) {
            if (userType === 'me') {
                if (!isFetchingMe && hasNextPageMe) {
                    fetchNextPageMe();
                }
            } else {
                if (!isFetchingOther && hasNextPageOther) {
                    fetchNextPageOther();
                }
            }
        }
    }, [
        inView,
        isFetchingOther,
        hasNextPageOther,
        fetchNextPageOther,
        isFetchingMe,
        hasNextPageMe,
        fetchNextPageMe,
        userType,
    ]);
    return (
        <div className="flex flex-col items-center border-t border-gray-800 py-5 w-full">
            <div className="flex w-[80%] justify-end">
                <Order setOrder={setOrder} order={order} />
            </div>
            <div className="flex flex-col w-full gap-2 items-center min-h-[50vh] h-fit-content mt-[20px]">
                {meLikeData?.pages.map((datalist) =>
                    datalist.data.data.map((lp) => (
                        <LpCard {...lp} key={lp.id}></LpCard>
                    ))
                )}
                {otherUserLikeData?.pages.map((datalist) =>
                    datalist.data.data.map((lp) => (
                        <LpCard {...lp} key={lp.id}></LpCard>
                    ))
                )}
                <div ref={ref} className="flex w-full justify-center h-auto">
                    {(isFetchingMe || isFetchingOther) && (
                        <ClipLoader color={'#fff'} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default LikeLps;

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
        <div className="flex flex-col items-center w-full py-5">
            <div className="flex w-[80%] justify-end">
                <Order setOrder={setOrder} order={order} />
            </div>
            <div className="grid gap-2 justify-center max-w-[95%] h-fit-content mt-[20px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
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
            </div>
            <div ref={ref} className="flex justify-center w-full h-auto">
                {(isFetchingMe || isFetchingOther) && (
                    <ClipLoader color={'#fff'} />
                )}
            </div>
        </div>
    );
};

export default LikeLps;

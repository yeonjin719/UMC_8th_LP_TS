import { useEffect, useState } from 'react';
import LpCard from '../LpCard/LpCard';
import { TOrder, TOrderLabel } from '../../constants/enum';
import Order from '../common/order/order';
import useGetUsersLP from '../../hooks/queries/useGetUsersLP';
import { useInView } from 'react-intersection-observer';
import ClipLoader from 'react-spinners/ClipLoader';

export default function MadeByMeLP({ userId }: { userId: number }) {
    const [order, setOrder] = useState<keyof typeof TOrderLabel>(
        TOrder.NEWEST_FIRST
    );

    const { data, fetchNextPage, hasNextPage, isFetching } = useGetUsersLP({
        userId,
        order,
    });
    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView) {
            if (!isFetching && hasNextPage) {
                fetchNextPage();
            }
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);
    return (
        <div className="flex flex-col items-center w-full py-5">
            <div className="flex w-[80%] justify-end">
                <Order setOrder={setOrder} order={order} />
            </div>
            <div className="grid gap-2 justify-center max-w-[95%] h-fit-content mt-[20px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
                {data?.pages.map((datalist) =>
                    datalist.data.data.map((lp) => <LpCard {...lp}></LpCard>)
                )}
            </div>
            <div ref={ref} className="flex justify-center w-full h-auto">
                {isFetching && <ClipLoader color={'#fff'} />}
            </div>
        </div>
    );
}

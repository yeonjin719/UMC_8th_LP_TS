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
        <div className="flex flex-col items-center border-t border-gray-800 py-5 w-full">
            <div className="flex w-[80%] justify-end">
                <Order setOrder={setOrder} order={order} />
            </div>
            <div className="flex flex-col w-full gap-2 items-center min-h-[75vh] h-fit-content mt-[20px]">
                {data?.pages.map((datalist) =>
                    datalist.data.data.map((lp) => <LpCard {...lp}></LpCard>)
                )}{' '}
                <div ref={ref} className="flex w-full justify-center h-auto">
                    {isFetching && <ClipLoader color={'#fff'} />}
                </div>
            </div>
        </div>
    );
}

import { useEffect, useState } from 'react';
import PaginationBar from '../common/paginationBar/paginationBar';
import LpCard from '../LpCard/LpCard';
import { TOrder, TOrderLabel } from '../../constants/enum';
import Order from '../common/order/order';
import useGetUsersLP from '../../hooks/queries/useGetUsersLP';
export default function MadeByMeLP({ userId }: { userId: number }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [order, setOrder] = useState<keyof typeof TOrderLabel>(
        TOrder.NEWEST_FIRST
    );
    const [cursor, setCursor] = useState<number | null>(0);
    const [nextCursor, setNextCursor] = useState<number | null>(0);
    const { data } = useGetUsersLP({ userId, order, cursor: cursor });

    useEffect(() => {
        setCursor(null);
        setCurrentPage(0);
    }, [order]);

    useEffect(() => {
        setCursor(nextCursor);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    useEffect(() => {
        if (data?.data.nextCursor && data?.data.hasNext) {
            setNextCursor(data?.data.nextCursor || null);
        }
    }, [data]);

    return (
        <div className="flex flex-col items-center border-t border-gray-800 py-5 w-full">
            <div className="flex w-[80%] justify-end">
                <Order setOrder={setOrder} order={order} />
            </div>
            <div className="flex flex-col w-full gap-2 items-center min-h-[75vh] h-fit-content mt-[20px]">
                {data?.data.data.map((lp) => {
                    return <LpCard {...lp}></LpCard>;
                })}
            </div>
            <div className="w-full flex justify-center">
                <PaginationBar
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    hasNextPage={data?.data.hasNext}
                />
            </div>
        </div>
    );
}

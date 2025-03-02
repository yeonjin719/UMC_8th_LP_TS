/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useGetLikesMeLps from '../../hooks/queries/useGetLikesLp';
import PaginationBar from '../common/paginationBar/paginationBar';
import LpCard from '../LpCard/LpCard';
import { TOrder, TOrderLabel } from '../../constants/enum';
import Order from '../common/order/order';
import useGetOtherUserLikeLP from '../../hooks/queries/useGetOtherUserLikesLP';
type TLikeLpsProps = {
    userType: 'me' | number;
};

const LikeLps = ({ userType }: TLikeLpsProps) => {
    const [order, setOrder] = useState<keyof typeof TOrderLabel>(
        TOrder.NEWEST_FIRST
    );
    const [currentPage, setCurrentPage] = useState(0);
    const [cursor, setCursor] = useState<number | null>(0);
    const [nextCursor, setNextCursor] = useState<number | null>(0);
    const { data: meLikeData } = useGetLikesMeLps({
        cursor: cursor,
        order,
        userType,
    });
    const { data: otherUserLikeData } = useGetOtherUserLikeLP({
        cursor: cursor,
        order,
        userType,
        userId: userType as number,
    });

    useEffect(() => {
        setCursor(null);
        setCurrentPage(0);
    }, [order]);

    useEffect(() => {
        setCursor(nextCursor);
    }, [currentPage]);

    useEffect(() => {
        if (meLikeData?.data.nextCursor && meLikeData?.data.hasNext) {
            setNextCursor(meLikeData?.data.nextCursor || null);
        }
        if (
            otherUserLikeData?.data.nextCursor &&
            otherUserLikeData?.data.hasNext
        ) {
            setNextCursor(otherUserLikeData?.data.nextCursor || null);
        }
    }, [meLikeData, otherUserLikeData]);
    return (
        <div className="flex flex-col items-center border-t border-gray-800 py-5 w-full">
            <div className="flex w-[80%] justify-end">
                <Order setOrder={setOrder} order={order} />
            </div>
            <div className="flex flex-col w-full gap-2 items-center min-h-[50vh] h-fit-content mt-[20px]">
                {meLikeData?.data.data.map((lp) => {
                    return <LpCard {...lp}></LpCard>;
                })}
                {otherUserLikeData?.data.data.map((lp) => {
                    return <LpCard {...lp}></LpCard>;
                })}
            </div>
            <div className="w-full flex justify-center">
                <PaginationBar
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
};

export default LikeLps;

import { useState } from 'react';
import useGetLikesMeLps from '../../hooks/queries/useGetLikesLp';
import PaginationBar from '../common/paginationBar/paginationBar';
import LpCard from '../LpCard/LpCard';
import { TOrder } from '../../constants/enum';
import Order from '../common/order/order';
const LikeLps = () => {
    const [order, setOrder] = useState<TOrder>(TOrder.오래된순);
    const [currentPage, setCurrentPage] = useState(0);
    const { data } = useGetLikesMeLps({ cursor: currentPage * 10, order });
    return (
        <div className="flex flex-col items-center border-t border-gray-800 py-5 w-full">
            <div className="flex w-[80%] justify-end">
                <Order setOrder={setOrder} order={order} />
            </div>
            <div className="flex flex-col w-full gap-2 items-center min-h-[50vh] h-fit-content">
                {data?.data.data.map((lp) => {
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

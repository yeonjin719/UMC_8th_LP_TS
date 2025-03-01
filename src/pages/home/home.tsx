import { useState } from 'react';
import Order from '../../components/common/order/order';
import PaginationBar from '../../components/common/paginationBar/paginationBar';
import LpCard from '../../components/LpCard/LpCard';
import { TOrder } from '../../constants/enum';
import useGetLps from '../../hooks/queries/useGetLps';

const HomePage = () => {
    const [order, setOrder] = useState<TOrder>(TOrder.오래된순);
    const [currentPage, setCurrentPage] = useState(0);
    const { data } = useGetLps({ cursor: currentPage * 10, order });
    return (
        <div className="flex flex-col items-center border-t border-gray-800 py-5">
            <div className="flex w-[80%] justify-end">
                <Order setOrder={setOrder} order={order} />
            </div>
            <div className="flex flex-col w-full gap-2 mt-4 items-center min-h-[75vh] h-fit-content justify-center">
                {data?.data.data?.map((lp) => {
                    return <LpCard {...lp} key={lp.id}></LpCard>;
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
};

export default HomePage;

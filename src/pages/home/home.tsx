import { useState } from 'react';
import Order from '../../components/common/order/order';
import { TOrder, TOrderLabel } from '../../constants/enum';
import LpList from '../../components/LpList/LpList';

const HomePage = () => {
    const [order, setOrder] = useState<keyof typeof TOrderLabel>(
        TOrder.NEWEST_FIRST
    );

    return (
        <div className="flex flex-col items-center py-5 border-t border-gray-800">
            <div className="flex w-[80%] justify-end">
                <Order setOrder={setOrder} order={order} />
            </div>
            <LpList order={order}></LpList>
        </div>
    );
};

export default HomePage;

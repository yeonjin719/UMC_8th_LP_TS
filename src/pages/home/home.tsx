import { useEffect, useState } from 'react';
import Order from '../../components/common/order/order';
import LpCard from '../../components/LpCard/LpCard';
import { TOrder, TOrderLabel, TSearchEnum } from '../../constants/enum';
import useGetLps from '../../hooks/queries/useGetLps';
import { useInView } from 'react-intersection-observer';
import ClipLoader from 'react-spinners/ClipLoader';

const HomePage = () => {
    const [order, setOrder] = useState<keyof typeof TOrderLabel>(
        TOrder.NEWEST_FIRST
    );
    const { data, isFetching, hasNextPage, fetchNextPage } = useGetLps({
        cursor: 0,
        order,
        type: TSearchEnum.TITLE,
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
        <div className="flex flex-col items-center border-t border-gray-800 py-5">
            <div className="flex w-[80%] justify-end">
                <Order setOrder={setOrder} order={order} />
            </div>
            <div className="grid gap-2 justify-center max-w-[95%] h-fit-content mt-[20px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
                {data?.pages.map((datalist) =>
                    datalist.data.data.map((lp) => (
                        <LpCard {...lp} key={lp.id}></LpCard>
                    ))
                )}
                <div ref={ref} className="flex w-full justify-center h-auto">
                    {isFetching && <ClipLoader color={'#fff'} />}
                </div>
            </div>
        </div>
    );
};

export default HomePage;

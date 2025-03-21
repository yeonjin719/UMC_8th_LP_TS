import { useEffect, useState } from 'react';
import Order from '../../components/common/order/order';
import LpCard from '../../components/LpCard/LpCard';
import { TOrder, TOrderLabel, TSearchEnum } from '../../constants/enum';
import useGetLps from '../../hooks/queries/useGetLps';
import ClipLoader from 'react-spinners/ClipLoader';
import useThrottle from '../../hooks/common/useThrottle';

const HomePage = () => {
    const [order, setOrder] = useState<keyof typeof TOrderLabel>(
        TOrder.NEWEST_FIRST
    );
    const [scrollY, setScrollY] = useState(0);
    const throttledScrollY = useThrottle(scrollY, 300);

    const { data, isFetching, hasNextPage, fetchNextPage, refetch } = useGetLps(
        {
            cursor: 0,
            order,
            type: TSearchEnum.TITLE,
        }
    );

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - 100) {
            if (!isFetching && hasNextPage) {
                fetchNextPage();
            }
        }
    }, [throttledScrollY, isFetching, hasNextPage, fetchNextPage]);

    // order가 바뀌면 refetch
    useEffect(() => {
        refetch();
    }, [order, refetch]);

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
            </div>
            <div className="flex w-full justify-center h-auto mt-[10px]">
                {isFetching && <ClipLoader color={'#fff'} />}
            </div>
        </div>
    );
};

export default HomePage;

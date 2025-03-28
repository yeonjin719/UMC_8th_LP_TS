import { useEffect, useRef, useState } from 'react';
import useGetLps from '../../hooks/queries/useGetLps';
import useThrottle from '../../hooks/common/useThrottle';
import { TOrder, TSearchEnum } from '../../constants/enum';
import LpCard from '../LpCard/LpCard';

import LpCardSkeleton from '../LpCard/LpCardSkeleton';

type Props = {
    order: TOrder;
};

const LpList = (props: Props) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0);
    const throttledScrollY = useThrottle(scrollY, 1000);

    const { order } = props;
    const { data, isFetching, hasNextPage, fetchNextPage, refetch } = useGetLps(
        {
            cursor: 0,
            order,
            type: TSearchEnum.TITLE,
        }
    );
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            setScrollY(container.scrollTop);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;

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
        <div
            ref={scrollContainerRef}
            className="flex justify-center overflow-auto h-[80vh] w-full"
        >
            <div className="grid gap-2 justify-center max-w-[95%] h-fit-content mt-[20px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
                {data?.pages.map((datalist) =>
                    datalist.data.data.map((lp) => (
                        <LpCard {...lp} key={lp.id}></LpCard>
                    ))
                )}
                {isFetching &&
                    hasNextPage &&
                    Array.from({ length: 10 }).map((_, index) => (
                        <LpCardSkeleton key={index} />
                    ))}
            </div>
        </div>
    );
};
export default LpList;

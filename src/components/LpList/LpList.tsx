import { useEffect, useState } from 'react';
import useGetLps from '../../hooks/queries/useGetLps';
import useThrottle from '../../hooks/common/useThrottle';
import { TOrder, TSearchEnum } from '../../constants/enum';
import LpCard from '../LpCard/LpCard';
import LPCardSkeletonList from '../LPCardSkeletonList/LPCardSkeletonList';

type Props = {
    order: TOrder;
};

const LpList = (props: Props) => {
    const [scrollY, setScrollY] = useState(0);
    const throttledScrollY = useThrottle(scrollY, 300);
    const { order } = props;
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
        console.log(clientHeight, scrollHeight);
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
        <div className="grid gap-2 justify-center max-w-[95%] h-fit-content mt-[20px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
            {data?.pages.map((datalist) =>
                datalist.data.data.map((lp) => (
                    <LpCard {...lp} key={lp.id}></LpCard>
                ))
            )}
            <div className="flex w-full justify-center h-auto mt-[10px]">
                {isFetching && <LPCardSkeletonList></LPCardSkeletonList>}
            </div>
        </div>
    );
};
export default LpList;

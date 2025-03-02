// import Error from '../../components/error/error';

import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, selectModal } from '../../slices/modalSlice';

import { MODAL_TYPES } from '../../components/common/modal/modalProvider';
import { useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import useGetLps from '../../hooks/queries/useGetLps';
import Order from '../../components/common/order/order';
import { TOrder, TOrderLabel, TSearchEnum } from '../../constants/enum';
import LpCard from '../../components/LpCard/LpCard';
import { TLp } from '../../types/lp';
import PaginationBar from '../../components/common/paginationBar/paginationBar';
import useGetLPWithTag from '../../hooks/queries/useGetLPWithTag';

const Search = () => {
    const location = useLocation();
    const searchParams = useMemo(
        () => new URLSearchParams(location.search),
        [location.search]
    );
    const [currentPage, setCurrentPage] = useState(0);
    const keyword = searchParams.get('keyword') || '';
    const type = localStorage.getItem('type') || TSearchEnum.TITLE;
    const dispatch = useDispatch();
    const [order, setOrder] = useState<keyof typeof TOrderLabel>(
        TOrder.NEWEST_FIRST
    );
    const [cursor, setCursor] = useState<number | null>(0);
    const [nextCursor, setNextCursor] = useState<number | null>(0);

    const { isOpen } = useSelector(selectModal);

    const { data: titleData } = useGetLps({
        order,
        cursor: cursor,
        search: keyword,
        type: type as TSearchEnum,
    });

    const { data: tagData } = useGetLPWithTag({
        order,
        tagName: keyword,
        cursor: cursor,
        type: type as TSearchEnum,
    });
    useEffect(() => {
        setCursor(null);
        setCurrentPage(0);
    }, [order]);

    useEffect(() => {
        setCursor(nextCursor);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    useEffect(() => {
        if (tagData?.data.nextCursor && tagData?.data.hasNext) {
            setNextCursor(tagData?.data.nextCursor || null);
        }
        if (titleData?.data.nextCursor && titleData?.data.hasNext) {
            setNextCursor(titleData?.data.nextCursor || null);
        }
    }, [titleData, tagData]);

    // if (keyword) {
    //     console.log('데이터가 없습니다');
    //     return <Error />;
    // }

    return (
        <div className="flex flex-col w-full items-center relative mt-[16px]">
            <div className={`w-screen flex justify-center relative h-[50px]`}>
                <div
                    className={`w-full flex justify-center h-[50px] relative`}
                    onClick={() =>
                        dispatch(openModal(MODAL_TYPES.SearchBoxModal))
                    }
                >
                    <div className="w-[50%] relative flex ">
                        <FaSearch
                            color="white"
                            className="absolute left-0 top-4"
                            size={20}
                        />
                        <div className="border-b-white border-b-[1px] w-full h-[50px] flex items-center text-white pl-[30px] outline-none text-[20px]">
                            {keyword}
                        </div>
                        <div className="text-white flex ml-[5px] relative self-end items-center w-[120px] justify-center border-[1px] h-[35px] rounded-[10px] pt-[3px] pb-[3px]">
                            {type}
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`flex flex-wrap justify-center gap-5 mt-5 pl-[20px] pr-[20px] w-[80%] ${
                    isOpen ? 'mt-[50px]' : 'mt-0'
                }`}
            >
                <div className="flex w-full justify-end">
                    <Order setOrder={setOrder} order={order} />
                </div>
                {/* {(isLoading || isPending) && keyword && (
                    <CardListSkeleton number={20}></CardListSkeleton>
                )} */}
                {titleData?.data.data.map((lp: TLp) => (
                    <LpCard {...lp} />
                ))}
                {tagData?.data.data.map((lp: TLp) => (
                    <LpCard {...lp} />
                ))}
            </div>
            <div className="w-full mb-4">
                <PaginationBar
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    hasNextPage={
                        tagData?.data.hasNext || titleData?.data.hasNext
                    }
                />
            </div>
        </div>
    );
};

export default Search;

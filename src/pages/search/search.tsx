// import Error from '../../components/error/error';

import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, selectModal } from '../../slices/modalSlice';
import ClipLoader from 'react-spinners/ClipLoader';

import { MODAL_TYPES } from '../../components/common/modal/modalProvider';
import { useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import Order from '../../components/common/order/order';
import { TOrder, TOrderLabel, TSearchEnum } from '../../constants/enum';
import LpCard from '../../components/LpCard/LpCard';

import useGetLPWithTag from '../../hooks/queries/useGetLPWithTag';
import { useInView } from 'react-intersection-observer';
import useGetSearchLps from '../../hooks/queries/useGetSearchLP';

const Search = () => {
    const location = useLocation();
    const searchParams = useMemo(
        () => new URLSearchParams(location.search),
        [location.search]
    );
    const keyword = searchParams.get('keyword') || '';
    const type = localStorage.getItem('type') || TSearchEnum.TITLE;
    const dispatch = useDispatch();

    const [order, setOrder] = useState<keyof typeof TOrderLabel>(
        TOrder.NEWEST_FIRST
    );

    const { isOpen } = useSelector(selectModal);

    const {
        data: titleData,
        fetchNextPage: fetchNextPageTitle,
        hasNextPage: hasNextPageTitle,
        isFetching: isFetchingTitle,
    } = useGetSearchLps({
        order,
        search: keyword,
        type: type as TSearchEnum,
    });

    const {
        data: tagData,
        fetchNextPage: fetchNextPageTag,
        hasNextPage: hasNextPageTag,
        isFetching: isFetchingTag,
    } = useGetLPWithTag({
        order,
        tagName: keyword,
        type: type as TSearchEnum,
    });

    const { ref, inView } = useInView({
        threshold: 0,
    });
    useEffect(() => {
        if (inView) {
            if (type === 'tag') {
                if (!isFetchingTag && hasNextPageTag) {
                    fetchNextPageTag();
                }
            } else {
                if (!isFetchingTitle && hasNextPageTitle) {
                    fetchNextPageTitle();
                }
            }
        }
    }, [
        inView,
        isFetchingTag,
        hasNextPageTag,
        fetchNextPageTag,
        isFetchingTitle,
        hasNextPageTitle,
        fetchNextPageTitle,
        type,
    ]);

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
                            {type === TSearchEnum.TAG ? '태그' : '제목'}
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
                {tagData?.pages.map((datalist) =>
                    datalist.data.data.map((lp) => (
                        <LpCard {...lp} key={lp.id}></LpCard>
                    ))
                )}
                {titleData?.pages.map((datalist) =>
                    datalist.data.data.map((lp) => (
                        <LpCard {...lp} key={lp.id}></LpCard>
                    ))
                )}
                <div ref={ref} className="flex w-full justify-center h-auto">
                    {(isFetchingTag || isFetchingTitle) && (
                        <ClipLoader color={'#fff'} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;

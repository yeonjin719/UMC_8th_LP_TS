// import Error from '../../components/error/error';

import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, selectModal } from '../../slices/modalSlice';

import { MODAL_TYPES } from '../../components/common/modal/modalProvider';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

const Search = () => {
    const location = useLocation();
    const searchParams = useMemo(
        () => new URLSearchParams(location.search),
        [location.search]
    );
    const keyword = searchParams.get('keyword') || '';
    const type = localStorage.getItem('type') || '제목';
    const dispatch = useDispatch();
    const { isOpen } = useSelector(selectModal);

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
                className={`flex flex-wrap justify-center gap-5 mt-5 pl-[20px] pr-[20px] ${
                    isOpen ? 'mt-[50px]' : 'mt-0'
                }`}
            >
                {/* {(isLoading || isPending) && keyword && (
                    <CardListSkeleton number={20}></CardListSkeleton>
                )}
                {data?.results.map((movie: TMovieSingleResponse) => (
                    <MovieCard key={movie.id} {...movie} />
                ))} */}
            </div>
        </div>
    );
};

export default Search;

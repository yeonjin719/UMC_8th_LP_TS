import MovieCard from '../../components/movieCard/movieCard';
import Error from '../../components/error/error';
import { TMovieSingleResponse } from '../../apis/movie';
import useGetSearchMovies from '../../hooks/queries/useGetSearchMovies';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, selectModal } from '../../slices/modalSlice';
import CardListSkeleton from '../../components/movieCard/Skeleton/card-list-skeleton';
import { MODAL_TYPES } from '../../components/modal/modalProvider';

const Search = () => {
    const urlParams = new URLSearchParams(location.search);
    const keyword = urlParams.get('keyword') || '';

    const dispatch = useDispatch();
    const { isOpen } = useSelector(selectModal);
    const { data, error, isLoading, isPending } = useGetSearchMovies(keyword);

    if (error && keyword) {
        console.log('데이터가 없습니다');
        return <Error />;
    }

    return (
        <div className="flex flex-col w-full items-center relative">
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
                            className="absolute left-0 top-3.5"
                            size={20}
                        />
                        <div className="border-b-white border-b-[1px] w-full h-[50px] flex items-center text-white pl-[30px] outline-none text-[20px]">
                            {keyword}
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`flex flex-wrap justify-center gap-5 mt-5 pl-[20px] pr-[20px] ${
                    isOpen ? 'mt-[50px]' : 'mt-0'
                }`}
            >
                {(isLoading || isPending) && keyword && (
                    <CardListSkeleton number={20}></CardListSkeleton>
                )}
                {data?.results.map((movie: TMovieSingleResponse) => (
                    <MovieCard key={movie.id} {...movie} />
                ))}
            </div>
        </div>
    );
};

export default Search;

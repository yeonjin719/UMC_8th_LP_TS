import CategoryCard from '../../components/categoryCard/categoryCard';

import useGetCategory from '../../hooks/queries/useGetCategory';
import { IoAddCircleOutline } from 'react-icons/io5';
import useGetLps from '../../hooks/queries/useGetLps';

import Loading from '../Loading/Loading';
import LpCard from '../../components/LpCard/LpCard';
import { useParams } from 'react-router-dom';
import Error from '../error/error';
const Movie = () => {
    const { category } = useParams();
    const {
        data,
        isError: categoryError,
        isLoading: categoryLoading,
    } = useGetCategory();
    const {
        data: LpData,
        isLoading,
        isError,
    } = useGetLps({
        categoryId: Number(category),
    });
    if (isLoading || categoryLoading) {
        return <Loading />;
    }
    if (isError || categoryError) {
        return <Error />;
    }
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="flex text-white mb-5 mt-[30px] text-[30px] font-bold">
                카테고리
            </div>
            <div className="flex flex-wrap justify-center gap-5 mt-5 items-center">
                {Array.isArray(data) &&
                    data.map((item, idx) => {
                        return (
                            <CategoryCard
                                key={idx}
                                id={Number(item.id)}
                                text={item.name}
                            />
                        );
                    })}
                <IoAddCircleOutline color="white" size={25} />
            </div>
            <div className="flex mt-[30px] gap-[10px] flex-col w-full justify-center items-center">
                {Array.isArray(LpData) &&
                    LpData?.map((data) => {
                        return <LpCard {...data} key={data.id} />;
                    })}
            </div>
        </div>
    );
};

export default Movie;

import CategoryCard from '../../components/categoryCard/categoryCard';
import CategoryData from '../../constants/Menu';

const Movie = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="flex text-white mb-5 text-[30px] font-bold">
                카테고리
            </div>
            <div className="flex flex-wrap justify-center gap-5 mt-5">
                {CategoryData.map((item, idx) => {
                    return <CategoryCard key={idx} {...item} />;
                })}
            </div>
        </div>
    );
};

export default Movie;

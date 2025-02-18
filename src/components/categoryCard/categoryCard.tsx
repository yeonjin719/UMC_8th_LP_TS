import { useNavigate, useParams } from 'react-router-dom';

interface CategoryCardProps {
    id: number;
    text: string;
}

function CategoryCard({ id, text }: CategoryCardProps) {
    const navigate = useNavigate();
    const { category } = useParams();
    console.log(category);
    const handleClickCategory = (id: number) => {
        navigate(`/category/${id}`);
    };
    return (
        <div
            onClick={() => handleClickCategory(id)}
            className="flex hover:cursor-pointer"
        >
            <span
                className={`text-gray-300 px-2 py-1 rounded-sm
                ${Number(category) === id ? 'bg-pink-500' : 'bg-gray-800'}
                `}
            >
                #{text}
            </span>
        </div>
    );
}

export default CategoryCard;

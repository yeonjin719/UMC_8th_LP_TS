import { useNavigate } from 'react-router-dom';

interface CategoryCardProps {
    img_path: string;
    text: string;
    move_path: string;
}

function CategoryCard({ img_path, text, move_path }: CategoryCardProps) {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(move_path)} className="flex">
            <div className="relative gap-5">
                <span className="absolute bottom-2 left-2 bg-black text-white opacity-50 z-2 px-2 py-1 rounded-sm">
                    {text}
                </span>
                <img
                    src={img_path}
                    alt="해당 카테고리로 이동할 수 있는 이미지"
                    className="w-[245px] h-[130px] rounded-lg object-cover"
                />
            </div>
        </div>
    );
}

export default CategoryCard;

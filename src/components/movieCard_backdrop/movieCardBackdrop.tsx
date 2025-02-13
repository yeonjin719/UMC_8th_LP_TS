import { useState } from 'react';
import NoneImg from '../../images/img.png';
import { TMovieSingleResponse } from '../../apis/movie.ts';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
function MovieCardBackdrop({
    backdrop_path,
    title,
    id,
    release_date,
    vote_average,
}: TMovieSingleResponse) {
    const [ishovered, setIsHovered] = useState<boolean>(false);
    const [isLike, setIsLike] = useState(false);

    const navigate = useNavigate();
    return (
        <div
            className="relative w-[270px] h-[140px] text-decoration-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {backdrop_path != null ? (
                <img
                    src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
                    alt="포스터 이미지"
                    className="w-[270px] h-[140px] rounded-[10px] object-cover"
                />
            ) : (
                <img
                    src={NoneImg}
                    alt="포스터 이미지"
                    className="w-[270px] h-[140px] rounded-[10px] object-cover"
                />
            )}
            {ishovered && (
                <div onClick={() => navigate(`/movies/${id}`)}>
                    <div className="absolute z-2 top-[70px] left-[10px] text-white text-[20px] font-bold whitespace-nowrap overflow-hidden">
                        {title}
                    </div>
                    <div className="absolute z-2 top-[95px] left-[10px] text-white text-[13px]">
                        평균 ★{vote_average}
                    </div>
                    <div className="absolute z-2 top-[115px] left-[10px] text-white text-[13px]">
                        개봉일 {release_date}
                    </div>
                    <div className="absolute top-0 left-0 w-full h-[140px] bg-gradient-to-t from-black/70 to-black/20 "></div>
                </div>
            )}
            {isLike ? (
                <FaHeart
                    color="red"
                    size={20}
                    className="absolute z-3 right-[8px] bottom-[10px]"
                    onClick={() => setIsLike(false)}
                ></FaHeart>
            ) : (
                <FaRegHeart
                    color="red"
                    size={20}
                    className="absolute z-3 right-[8px] bottom-[10px]"
                    onClick={() => setIsLike(true)}
                ></FaRegHeart>
            )}
        </div>
    );
}

export default MovieCardBackdrop;

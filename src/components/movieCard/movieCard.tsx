import { useState } from 'react';
import NoneImg from '../../images/img.png';
import { TMovieSingleResponse } from '../../apis/movie.ts';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
function MovieCard({
    poster_path,
    title,
    release_date,
    id,
}: TMovieSingleResponse) {
    const [ishovered, setIsHovered] = useState<boolean>(false);
    const [isLike, setIsLike] = useState(false);
    return (
        <div
            className="w-[140px] h-[220px] relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <a href={`/movies/${id}`} className="text-decoration-none relative">
                {poster_path ? (
                    <>
                        <img
                            src={`https://image.tmdb.org/t/p/original${poster_path}`}
                            alt="포스터 이미지"
                            className="w-[140px] h-[200px] object-cover"
                        />
                    </>
                ) : (
                    <img
                        src={NoneImg}
                        alt="포스터 이미지"
                        className="w-[140px] h-[200px] object-cover"
                    />
                )}

                {ishovered && (
                    <div className="w-[140px] h-[200px] absolute top-0 left-0 bg-black opacity-50"></div>
                )}
                <div className="text-white text-[12px] font-bold w-[130px] whitespace-nowrap overflow-hidden text-ellipsis">
                    {title}
                </div>
                <div className="text-white text-[10px]">{release_date}</div>
            </a>
            {isLike ? (
                <FaHeart
                    color="red"
                    size={20}
                    className="absolute z-3 right-[8px] bottom-[30px]"
                    onClick={() => setIsLike(false)}
                ></FaHeart>
            ) : (
                <FaRegHeart
                    color="red"
                    size={20}
                    className="absolute z-3 right-[8px] bottom-[30px]"
                    onClick={() => setIsLike(true)}
                ></FaRegHeart>
            )}
        </div>
    );
}

export default MovieCard;

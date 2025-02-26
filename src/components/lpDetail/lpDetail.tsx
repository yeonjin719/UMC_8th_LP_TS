import { useParams } from 'react-router-dom';
import useGetLPDetails from '../../hooks/queries/useGetLPDetails';
import Profile from '../profile/profile';
import { formatRelativeTime } from '../../utils/transformDate';
import { FaBookmark } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import Comments from '../comments/comments';
import { useRef, useState } from 'react';
import { GoPencil } from 'react-icons/go';
import { FaCheck } from 'react-icons/fa';
const LpDetail = () => {
    const { lpId } = useParams();
    const { data } = useGetLPDetails({ lpId: Number(lpId) });
    const [edit, setEdit] = useState(false);
    const [image, setImage] = useState(
        'https://pbs.twimg.com/media/GAkrg_oa0AAtFsu.jpg:large'
    );
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file && file != null) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };
    return (
        <div className="flex flex-col h-full items-center w-full p-[30px] gap-[30px] ">
            <div className="flex w-full items-center flex-col ">
                {edit ? (
                    <div className="flex flex-col w-full  gap-[15px] justify-center items-center bg-[rgba(40,41,46)] rounded-[15px] p-[30px] relative">
                        <div className="flex gap-[40px] w-full justify-between">
                            <Profile
                                profile_path={data?.author?.profileImageUrl}
                                id={data?.author?.id}
                                name={data?.author?.name}
                            ></Profile>
                            <div className="text-white">
                                {formatRelativeTime(data?.createdAt)}
                            </div>
                        </div>
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={data?.title}
                                className="text-white text-[25px] border-1 border-white w-[80%] rounded-md px-5"
                            />
                            <div className="absolute flex gap-[15px] right-0 top-[10px]">
                                <FaBookmark color="white" size={20} />
                                <FaCheck
                                    color="white"
                                    size={20}
                                    onClick={() => setEdit(false)}
                                />
                                <FaRegTrashAlt color="white" size={20} />
                            </div>
                        </div>

                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                        />
                        <img
                            src={image}
                            alt=""
                            onClick={handleImageClick}
                            className="w-full hover:cursor-pointer hover:opacity-70"
                        />

                        <input
                            type="text"
                            className="text-white w-full border-white border-1 rounded-md p-5"
                            value={data?.description}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col w-full  gap-[15px] justify-center items-center bg-[rgba(40,41,46)] rounded-[15px] p-[30px] relative">
                        <div className="flex gap-[40px] w-full justify-between">
                            <Profile
                                profile_path={data?.author?.profileImageUrl}
                                id={data?.author?.id}
                                name={data?.author?.name}
                            ></Profile>
                            <div className="text-white">
                                {formatRelativeTime(data?.createdAt)}
                            </div>
                        </div>
                        <div className="relative w-full">
                            <div className="text-white text-[25px]">
                                {data?.title}
                            </div>
                            <div className="absolute flex gap-[15px] right-0 top-[10px]">
                                <FaBookmark color="white" size={20} />
                                <GoPencil
                                    color="white"
                                    size={20}
                                    onClick={() => setEdit(true)}
                                />
                                <FaRegTrashAlt color="white" size={20} />
                            </div>
                        </div>

                        <img src={image} alt="" className="w-full" />
                        <div className="text-white w-full">
                            {data?.description}
                        </div>
                        <div className="flex items-center gap-[10px]">
                            <FaHeart color="white" size={30} />
                            <div className="text-white text-[25px]">
                                {data?.totalLikes}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Comments></Comments>
        </div>
    );
};
export default LpDetail;

import { useNavigate, useParams } from 'react-router-dom';
import useGetLPDetails from '../../hooks/queries/useGetLPDetails';
import Profile from '../../components/common/profile/profile';
import { formatRelativeTime } from '../../utils/transformDate';
import { FaHeart } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import Comments from '../../components/comments/comments';
import { useRef, useState } from 'react';
import { GoPencil } from 'react-icons/go';
import { FaCheck } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import useDeleteLP from '../../hooks/queries/useDeleteLP';

const LpDetail = () => {
    const { lpId } = useParams();
    const navigate = useNavigate();
    const { data } = useGetLPDetails({ lpId: Number(lpId) });
    const [edit, setEdit] = useState(false);
    const [image, setImage] = useState('');
    const { mutate: deleteMutate } = useDeleteLP();
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

    const handleDeleteLP = () => {
        deleteMutate(
            { lpsId: Number(lpId) },
            {
                onSuccess: () => {
                    navigate('/');
                },
            }
        );
    };

    return (
        <div className="flex flex-col items-center w-full p-[30px] gap-[30px]">
            <div className="flex w-full items-center flex-col ">
                {edit ? (
                    <div className="flex flex-col w-[80%] gap-[15px] justify-center items-center bg-[rgba(40,41,46)] rounded-[15px] p-[30px] relative">
                        <div className="flex gap-[40px] w-[80%] justify-between">
                            <Profile
                                profile_path={data?.data.author?.avatar}
                                id={data?.data.author?.id}
                                name={data?.data.author?.name}
                            ></Profile>
                            <div className="text-white">
                                {formatRelativeTime(data?.data.createdAt)}
                            </div>
                        </div>
                        <div className="relative w-[80%]">
                            <input
                                type="text"
                                value={data?.data.title}
                                className="text-white text-[25px] border-1 border-white w-[85%] rounded-md px-5"
                            />
                            <div className="absolute flex gap-[15px] right-0 top-[10px]">
                                <FaCheck
                                    color="white"
                                    size={20}
                                    onClick={() => setEdit(false)}
                                />
                                <FaRegTrashAlt
                                    color="white"
                                    size={20}
                                    onClick={handleDeleteLP}
                                />
                            </div>
                        </div>

                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                        />
                        {image && (
                            <img
                                src={image}
                                alt=""
                                onClick={handleImageClick}
                                className="w-[80%] hover:cursor-pointer hover:opacity-70"
                            />
                        )}

                        <input
                            type="text"
                            className="text-white w-[80%] border-white border-1 rounded-md p-5"
                            value={data?.data.content}
                        />
                        <div className="flex flex-wrap gap-[10px] mt-4">
                            {data?.data.tags.map((tag) => {
                                return (
                                    <div className="bg-gray-700 text-white px-3 py-1 rounded-full flex items-center gap-2">
                                        #{tag.name}
                                        <IoMdClose />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col w-[80%] gap-[30px] justify-center items-center bg-[rgba(40,41,46)] rounded-[15px] p-[30px] relative">
                        <div className="flex gap-[40px] w-[80%] justify-between">
                            <Profile
                                profile_path={data?.data.author?.avatar}
                                id={data?.data.author?.id}
                                name={data?.data.author?.name}
                            ></Profile>
                            <div className="text-white">
                                {formatRelativeTime(data?.data.createdAt)}
                            </div>
                        </div>
                        <div className="relative w-[80%]">
                            <div className="text-white text-[25px] max-w-[85%]">
                                {data?.data.title}
                            </div>
                            <div className="absolute flex gap-[15px] right-0 top-[10px]">
                                <GoPencil
                                    color="white"
                                    size={20}
                                    onClick={() => setEdit(true)}
                                />
                                <FaRegTrashAlt
                                    color="white"
                                    size={20}
                                    onClick={handleDeleteLP}
                                />
                            </div>
                        </div>
                        {data?.data.thumbnail && (
                            <img
                                src={data?.data.thumbnail}
                                alt=""
                                className="w-[80%] mt-4"
                            />
                        )}

                        <div className="text-white w-[80%]">
                            {data?.data.content}
                        </div>
                        <div className="flex flex-wrap gap-[10px] mt-4">
                            {(data?.data.tags || []).map((tag) => {
                                return (
                                    <div className="bg-gray-700 text-white px-3 py-1 rounded-full">
                                        # {tag.name}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex items-center gap-[10px]">
                            <FaHeart color="white" size={30} />
                            {/* <div className="text-white text-[25px]">
                                {data?.totalLikes}
                            </div> */}
                        </div>
                    </div>
                )}
            </div>
            <Comments lpsId={Number(lpId)} />
        </div>
    );
};
export default LpDetail;

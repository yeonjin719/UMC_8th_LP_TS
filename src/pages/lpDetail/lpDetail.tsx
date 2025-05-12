import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useGetLPDetails from '../../hooks/queries/useGetLPDetails';
import useDeleteLP from '../../hooks/queries/useDeleteLP';
import useLikeLP from '../../hooks/queries/useLikeLP';
import useDeleteLikeLP from '../../hooks/queries/useDeleteLikeLP';

import Profile from '../../components/common/profile/profile';
import Comments from '../../components/comments/comments';
import LpDetailEdit from './lpDetailEdit';
import defaultImg from '../../images/lp_default.svg';
import { formatRelativeTime } from '../../utils/transformDate';

import { hasLiked } from '../../utils/hasLiked';

import { FaHeart, FaRegTrashAlt, FaRegHeart } from 'react-icons/fa';
import { GoPencil } from 'react-icons/go';

import { useAuthContext } from '../../context/LogInContext';
import { queryClient } from '../../main';
import { isWriter } from '../../utils/isWriter';

const LpDetail = () => {
    const { lpId } = useParams();
    const navigate = useNavigate();
    const { userId } = useAuthContext();

    const { data } = useGetLPDetails({ lpId: Number(lpId) });

    const [like, setLike] = useState(false);
    const [addTag, setAddTag] = useState<string[]>([]);

    const [edit, setEdit] = useState(false);
    const { mutate: deleteMutate } = useDeleteLP();
    const { mutate: likeMutate } = useLikeLP();
    const { mutate: deleteLikeMutate } = useDeleteLikeLP();

    useEffect(() => {
        const tagNames = data?.data.tags.map((tag) => tag.name) || [];
        setAddTag(tagNames);
    }, [data]);

    useEffect(() => {
        setLike(hasLiked(data?.data.likes, userId));
    }, [data, userId]);

    const handleDeleteLP = () => {
        deleteMutate(
            { lpsId: Number(lpId) },
            {
                onSuccess: () => {
                    navigate('/');
                },
                onError: () => {
                    console.log(lpId);
                    alert('삭제 중 오류가 발생하였습니다');
                },
            }
        );
    };

    const handlePostLikeLP = () => {
        likeMutate(Number(lpId), {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['getLps', Number(lpId)],
                });
            },
        });
    };

    const handleDeleteLikeLP = () => {
        deleteLikeMutate(Number(lpId), {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['getLps', Number(lpId)],
                });
            },
        });
    };

    return (
        <div className="flex flex-col items-center w-full p-[30px] gap-[30px]">
            <div className="flex flex-col items-center w-full ">
                {edit ? (
                    <LpDetailEdit
                        setEdit={setEdit}
                        addTag={addTag}
                        setAddTag={setAddTag}
                        data={data}
                        handleDeleteLP={handleDeleteLP}
                    ></LpDetailEdit>
                ) : (
                    <div className="flex flex-col w-[80%] max-w-[800px] min-w-[470px] gap-[30px] justify-center items-center bg-[rgba(40,41,46)] rounded-[15px] p-[30px] relative">
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
                            {isWriter(data?.data.author.id, userId) && (
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
                            )}
                        </div>
                        {data?.data.thumbnail && (
                            <div className="relative flex justify-center items-center w-[90%] h-[90%] shadow-lg shadow-black rounded-sm p-3">
                                {data?.data.thumbnail && (
                                    <img
                                        src={data?.data.thumbnail || defaultImg}
                                        alt=""
                                        className="w-[90%] object-fit m-4 rounded-[50%] transform origin-center animate-spin border-black border-1 self-center"
                                        style={{ animationDuration: '5s' }}
                                    />
                                )}

                                <div className="bg-white w-[20%] h-[20%] rounded-[50%] absolute z-1 "></div>
                            </div>
                        )}

                        <div className="text-white w-[80%]">
                            {data?.data.content}
                        </div>
                        <div className="flex flex-wrap gap-[10px] mt-4">
                            {(data?.data.tags || []).map((tag) => {
                                return (
                                    <div
                                        key={tag.id}
                                        className="px-3 py-1 text-white bg-gray-700 rounded-full"
                                    >
                                        # {tag.name}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex items-center gap-[10px]">
                            {like ? (
                                <FaHeart
                                    color="white"
                                    size={30}
                                    onClick={handleDeleteLikeLP}
                                />
                            ) : (
                                <FaRegHeart
                                    color="white"
                                    size={30}
                                    onClick={handlePostLikeLP}
                                />
                            )}

                            <div className="text-white text-[25px]">
                                {data?.data.likes.length}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Comments lpsId={Number(lpId)} />
        </div>
    );
};
export default LpDetail;

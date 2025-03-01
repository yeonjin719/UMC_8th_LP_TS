import { useState, useRef, useEffect } from 'react';
import { TComment } from '../../types/lp';
import Profile from '../common/profile/profile';
import { HiDotsVertical } from 'react-icons/hi';
import { GoPencil } from 'react-icons/go';
import { FaRegTrashAlt } from 'react-icons/fa';
import useDeleteComment from '../../hooks/queries/useDeleteComment';
import { queryClient } from '../../main';
import { FaCheck } from 'react-icons/fa';
import useChangeComment from '../../hooks/queries/useChangeComment';

const Comment = ({ id, author, content, lpId }: TComment) => {
    const [openOptions, setOpenOptions] = useState(false);
    const optionsRef = useRef<HTMLDivElement>(null);
    const [edit, setEdit] = useState(false);
    const [comment, setComment] = useState(content);
    const { mutate: deleteCommentMutate } = useDeleteComment();
    const { mutate: patchCommentMutate } = useChangeComment();

    const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                optionsRef.current &&
                !optionsRef.current.contains(event.target as Node)
            ) {
                setOpenOptions(false);
            }
        }

        if (openOptions) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openOptions]);

    const handleDeleteComment = () => {
        deleteCommentMutate(
            {
                lpsId: lpId,
                commentId: id,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ['getComments', lpId],
                    });
                },
                onError: () => {
                    alert('삭제 중 에러가 발생하였습니다');
                },
            }
        );
    };

    const submitChangeComment = () => {
        patchCommentMutate(
            {
                lpsId: lpId,
                commentId: id,
                content: comment,
            },
            {
                onSuccess: () => {
                    setEdit(false);
                    setOpenOptions(false);
                    queryClient.invalidateQueries({
                        queryKey: ['getComments', lpId],
                    });
                },
                onError: () => {
                    alert('수정 중 에러가 발생하였습니다');
                },
            }
        );
    };

    return (
        <div className="flex items-center w-full justify-between relative">
            <div className="flex flex-1">
                <Profile id={id} profile_path={author.avatar}></Profile>
                <div className="flex flex-col flex-1">
                    <div className="text-white text-[18px]">{author.name}</div>
                    {edit ? (
                        <input
                            className="text-white w-[90%] border-1 border-white px-2 py-1 rounded-[5px]"
                            value={comment}
                            onChange={handleChangeComment}
                        ></input>
                    ) : (
                        <div className="text-white">{content}</div>
                    )}
                </div>
            </div>
            {edit ? (
                <FaCheck onClick={submitChangeComment} />
            ) : (
                <HiDotsVertical onClick={() => setOpenOptions(!openOptions)} />
            )}

            {openOptions && !edit && (
                <div
                    ref={optionsRef}
                    className="absolute bg-black flex right-[-40px] top-[40px] gap-3 p-2 rounded-[10px]"
                >
                    <GoPencil
                        size={20}
                        color="white"
                        onClick={() => setEdit(true)}
                    />
                    <FaRegTrashAlt
                        size={17}
                        color="white"
                        onClick={handleDeleteComment}
                    />
                </div>
            )}
        </div>
    );
};

export default Comment;

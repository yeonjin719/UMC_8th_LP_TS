import { useEffect, useState } from 'react';
import Comment from '../comment/comment';
import { useInView } from 'react-intersection-observer';
import Order from '../common/order/order';
import { TOrder, TOrderLabel } from '../../constants/enum';
import ClipLoader from 'react-spinners/ClipLoader';
import useGetComments from '../../hooks/queries/useGetComments';
import usePostComment from '../../hooks/queries/usePostComment';
import { queryClient } from '../../main';
const Comments = ({ lpsId }: { lpsId: number }) => {
    const [comment, setComment] = useState('');
    const [order, setOrder] = useState<keyof typeof TOrderLabel>(
        TOrder.NEWEST_FIRST
    );
    const { data, fetchNextPage, hasNextPage, isFetching } = useGetComments({
        lpsId,
        order,
        limit: 10,
    });
    const { mutate: commentMutate } = usePostComment();

    const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView) {
            if (!isFetching && hasNextPage) {
                fetchNextPage();
            }
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    const handleSubmitComment = () => {
        commentMutate(
            {
                content: comment,
                lpId: lpsId,
            },
            {
                onSuccess: () => {
                    setComment('');
                    queryClient.invalidateQueries({
                        queryKey: ['getComments', lpsId],
                    });
                },
            }
        );
    };

    return (
        <div className="bg-[rgba(40,41,46)] flex rounded-[15px] w-[80%] h-auto ">
            <div className="flex flex-col text-white h-full w-full p-5 gap-4">
                <div className="flex justify-between">
                    <div className="text-[18px]">댓글</div>
                    <Order setOrder={setOrder} order={order}></Order>
                </div>

                <div className="flex gap-2 items-center">
                    <input
                        type="text"
                        value={comment}
                        onChange={handleChangeComment}
                        placeholder="댓글을 입력해주세요"
                        className="bg-[rgba(40,41,46)] text-white flex-1 border-white border-[0.5px] rounded-md py-1 px-3"
                    />
                    <button
                        className="bg-pink-500 w-[60px] py-[5px] rounded-md disabled:bg-gray-400"
                        disabled={!comment}
                        onClick={handleSubmitComment}
                    >
                        작성
                    </button>
                </div>
                {data?.pages.map((datalist) =>
                    datalist.data.data.map((comment) => (
                        <Comment key={comment.id} {...comment}></Comment>
                    ))
                )}

                <div ref={ref} className="flex w-full justify-center h-auto">
                    {isFetching && <ClipLoader color={'#fff'} />}
                </div>
            </div>
        </div>
    );
};

export default Comments;

import { useState } from 'react';
import Comment from '../comment/comment';
import { GoPencil } from 'react-icons/go';
import Order from '../common/order/order';
import { TOrder } from '../../constants/enum';
const Comments = () => {
    const [comment, setComment] = useState('');
    const [order, setOrder] = useState<TOrder>(TOrder.LATEST);

    const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };
    return (
        <div className="bg-[rgba(40,41,46)] flex rounded-[15px] w-[80%] h-auto ">
            <div className="flex flex-col text-white h-full w-full p-5 gap-4">
                <div className="flex justify-between">
                    <div className="text-[18px]">댓글</div>
                    <Order setOrder={setOrder} order={order}></Order>
                </div>

                <div className="flex gap-2 items-center">
                    <GoPencil size={20} color="white"></GoPencil>
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
                    >
                        작성
                    </button>
                </div>
                <Comment></Comment>
                <Comment></Comment>
                <Comment></Comment>
                <Comment></Comment>
            </div>
        </div>
    );
};

export default Comments;

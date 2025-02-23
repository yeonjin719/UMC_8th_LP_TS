import { useState } from 'react';
import Comment from '../comment/comment';
import { GoPencil } from 'react-icons/go';
const Comments = () => {
    const [comment, setComment] = useState('');
    return (
        <div className="bg-[rgba(40,41,46)] flex rounded-[15px] w-full h-auto">
            <div className="flex flex-col text-white h-full w-full p-5 gap-4">
                <div className="text-[18px]">댓글</div>
                <div className="flex gap-2 items-center">
                    <GoPencil size={20} color="white"></GoPencil>
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="댓글을 입력해주세요"
                        className="bg-[rgba(40,41,46)] text-white flex-1"
                    />
                    <button className="bg-pink-500 w-[60px] rounded-md">
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

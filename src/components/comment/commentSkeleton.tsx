const CommentSkeleton = () => {
    return (
        <div className="relative flex items-center justify-between w-full animate-pulse">
            <div className="flex items-start flex-1 gap-2">
                <div className="bg-gray-400 w-[25px] h-[25px] rounded-[50%]"></div>
                <div className="flex flex-col flex-1 gap-2">
                    <div className="bg-gray-400 h-[15px] w-[100px] rounded-md"></div>
                    <div className="bg-gray-400 h-[18px] w-[95%] rounded-md"></div>
                </div>
            </div>
        </div>
    );
};
export default CommentSkeleton;

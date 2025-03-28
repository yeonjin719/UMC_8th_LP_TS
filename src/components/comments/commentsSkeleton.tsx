import CommentSkeleton from '../comment/commentSkeleton';

const CommentsSkeleton = () => {
    return (
        <div className="flex flex-col w-full h-full gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
                <CommentSkeleton key={index}></CommentSkeleton>
            ))}
        </div>
    );
};

export default CommentsSkeleton;

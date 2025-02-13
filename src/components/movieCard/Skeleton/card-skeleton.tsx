const CardSkeleton = () => {
    return (
        <div className="flex flex-col justify-start">
            <div className="w-[140px] h-[200px] bg-gray-300 animate-pulse"></div>
            <div className="w-[140px] h-[30px] flex flex-col gap-1 mt-1">
                <div className="bg-gray-300 h-[14px] rounded-md animate-pulse"></div>
                <div className="bg-gray-300 h-[10px] rounded-md animate-pulse"></div>
            </div>
        </div>
    );
};

export default CardSkeleton;

import LpCardSkeleton from '../LpCard/LpCardSkeleton';

const LPCardSkeletonList = () => {
    return (
        <div>
            {Array.from({ length: 10 }).map((_, index) => (
                <LpCardSkeleton key={index}></LpCardSkeleton>
            ))}
        </div>
    );
};

export default LPCardSkeletonList;

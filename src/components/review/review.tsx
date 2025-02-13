import renderStars from '../../utils/renderStars';
import { TReview } from '../../apis/movie';

type TReviewProps = {
    reviewData: TReview | undefined;
};

const Review = ({ reviewData }: TReviewProps) => {
    return (
        <div className="flex flex-col w-full">
            <div className="text-white text-xl font-semibold my-6">리뷰</div>
            {reviewData?.results.length === 0 ? (
                <div className="text-white text-sm mt-6">
                    리뷰가 아직 없습니다
                </div>
            ) : (
                <div className="flex flex-col gap-8 w-full">
                    {reviewData?.results.map((review) => (
                        <div key={review.id} className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <img
                                    className="w-8 h-8 object-cover rounded-full"
                                    src={
                                        review?.author_details?.avatar_path
                                            ? `https://image.tmdb.org/t/p/original${review?.author_details.avatar_path}`
                                            : 'https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo='
                                    }
                                    alt={`${review.author}'s avatar`}
                                />
                                <div className="text-white">
                                    {review.author}
                                </div>
                                <div className="flex">
                                    {review?.author_details?.rating !== null
                                        ? renderStars(
                                              review?.author_details?.rating
                                          )
                                        : null}
                                </div>
                            </div>
                            <div className="text-white ml-10">
                                {review.content}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Review;

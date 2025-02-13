import { PiPlayCircleLight } from 'react-icons/pi';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieInfoCard from '../../components/movieInfoCard/movieInfoCard';
import CreditInfoList from '../../components/creditInfoList/creditInfoList';
import SimilarMovie from '../../components/similarMovie/similarMovie';
import Review from '../../components/review/review';
import Error from '../../components/error/error';
import useGetMovieVideo from '../../hooks/queries/useGetMovieVideo';
import { useDispatch } from 'react-redux';
import { openModal } from '../../slices/modalSlice';
import { MODAL_TYPES } from '../../components/modal/modalProvider';
import useGetCredit from '../../hooks/queries/useGetCredit';
import ClipLoader from 'react-spinners/ClipLoader';
import useGetReview from '../../hooks/queries/useGetReview';

const MovieDetail = () => {
    const { movieId } = useParams();
    const [info, setInfo] = useState(0);

    const dispatch = useDispatch();
    const { data: movieVideo } = useGetMovieVideo(movieId!);
    const {
        data: creditData,
        error: creditError,
        isLoading: creditLoading,
    } = useGetCredit(movieId!);
    const {
        data: reviewData,
        error: reviewError,
        isLoading: reviewLoading,
    } = useGetReview(movieId!);

    const key = movieVideo?.results?.[0]?.key || null;

    const handleOpenModal = () => {
        if (key !== null) {
            dispatch(
                openModal({
                    modalType: MODAL_TYPES.YoutubeModal,
                    key: key,
                })
            );
        }
    };

    if (creditError || reviewError) {
        return <Error></Error>;
    }

    if (creditLoading || reviewLoading) {
        return (
            <div className="w-[100%] flex h-full justify-center items-center">
                <ClipLoader color="white"></ClipLoader>;
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full relative overflow-x-hidden pl-[20px] pr-[20px]">
            <MovieInfoCard key={1} movieId={movieId || ''} />
            {movieVideo?.results?.[0] !== undefined && (
                <PiPlayCircleLight
                    onClick={handleOpenModal}
                    className="text-white absolute min-[1080px]:top-[300px] min-[1080px]:left-[20px] z-5 min-[1080px]:w-[30px] min-[1080px]:h-[30px] top-[150px] left-[45%] w-[50px] h-[50px]"
                />
            )}

            <div className="mt-5 flex w-full items-center justify-center">
                <button
                    onClick={() => setInfo(0)}
                    className={`${
                        info === 0 ? 'underline' : ''
                    } text-white bg-black py-2 px-4 text-[17px]`}
                >
                    영화 정보
                </button>
                <button
                    onClick={() => setInfo(1)}
                    className={`${
                        info === 1 ? 'underline' : ''
                    } text-white bg-black py-2 px-4 text-[17px]`}
                >
                    관련 영화
                </button>
            </div>

            {info === 0 ? (
                <>
                    <CreditInfoList
                        movieId={movieId || ''}
                        creditData={creditData}
                    />
                    <Review reviewData={reviewData} />
                </>
            ) : (
                <SimilarMovie id={movieId!} />
            )}
        </div>
    );
};

export default MovieDetail;

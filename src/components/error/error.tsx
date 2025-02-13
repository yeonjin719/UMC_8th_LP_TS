import Lottie from 'react-lottie-player';
import errorJson from '../../lottie/Animation-error.json';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center w-full h-full text-center flex-col">
            <Lottie loop animationData={errorJson} play />
            <div
                onClick={() => navigate('/')}
                className="mt-4 w-36 h-8 flex justify-center items-center bg-pink-500 text-white rounded-lg"
            >
                홈으로 이동
            </div>
        </div>
    );
};

export default Error;

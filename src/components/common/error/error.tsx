// import Lottie from 'react-lottie-player';
// import errorJson from '../../lottie/Animation-error.json';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center w-full h-full text-center">
            {/* <Lottie loop animationData={errorJson} play /> */}
            <div
                onClick={() => navigate('/')}
                className="flex items-center justify-center h-8 mt-4 text-white bg-pink-500 rounded-lg w-36"
            >
                홈으로 이동
            </div>
        </div>
    );
};

export default Error;

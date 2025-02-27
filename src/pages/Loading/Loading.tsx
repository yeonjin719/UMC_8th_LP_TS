import Lottie from 'react-lottie-player';
import loading from '../../lottie/loading_circle.json';

const Loading = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <Lottie animationData={loading} loop play></Lottie>
        </div>
    );
};

export default Loading;

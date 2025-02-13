import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col  justify-center items-center gap-[20px] w-full h-screen">
            <div className="text-white text-[30px]">Oops!</div>
            <button
                className="bg-pink-600 pr-5 pl-5 rounded-lg text-white text-[25px]"
                onClick={() => navigate('/')}
            >
                Go to the home
            </button>
        </div>
    );
};

export default NotFound;

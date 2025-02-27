import { MdErrorOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
const Error = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <MdErrorOutline size={100} color="red" />
                <div className="text-white text-[20px] font-bold mt-5">
                    에러가 발생하였습니다
                </div>
            </div>
            <button
                onClick={() => navigate('/')}
                className="w-[100px] bg-pink-500 text-white"
            ></button>
        </div>
    );
};

export default Error;

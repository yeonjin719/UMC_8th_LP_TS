import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MODAL_TYPES } from '../common/modal/modalProvider';
import { openModal } from '../../slices/modalSlice';
import { useAuthContext } from '../../context/LogInContext';
import { IoPerson } from 'react-icons/io5';
type TSidebarProps = {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: TSidebarProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { isLogin } = useAuthContext();

    useEffect(() => {
        setIsSidebarOpen(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);
    const handleWithdraw = () => {
        dispatch(openModal(MODAL_TYPES.WithdrawModal));
    };
    return (
        <div
            className={`${
                isSidebarOpen && 'w-full'
            } absolute top-0 flex h-full min-[1080px]:w-[200px] min-[1080px]:relative`}
        >
            <nav
                className={`flex flex-col w-[200px] max-[1080px]:pt-[100px] justify-between bg-[#131313] p-4 h-full z-9 transition-transform duration-300 ease-in-out 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                min-[1080px]:relative min-[1080px]:translate-x-0 min-[1080px]:flex`}
            >
                <div className="flex flex-col gap-[10px]">
                    <div
                        onClick={() => {
                            navigate('/search');
                            setIsSidebarOpen(false);
                        }}
                        className={`flex items-center gap-[10px]  text-[15px] mt-[10px] ml-[20px] w-[100px] hover:cursor-pointer
                            ${
                                location.pathname === '/search'
                                    ? 'text-[#FF1E9D]'
                                    : 'text-white'
                            }`}
                    >
                        <FaSearch />
                        찾기
                    </div>
                    <div
                        onClick={() => {
                            navigate('/mypage');
                            setIsSidebarOpen(false);
                        }}
                        className={`flex items-center gap-[10px]  text-[15px] mt-[10px] ml-[20px] w-[100px] hover:cursor-pointer
                            ${
                                location.pathname === '/category'
                                    ? 'text-[#FF1E9D]'
                                    : 'text-white'
                            }`}
                    >
                        <IoPerson />
                        마이페이지
                    </div>
                </div>
                <div
                    className={`flex flex-col w-full mb-[20px] justify-center gap-[10px] items-center`}
                >
                    {isLogin && (
                        <div
                            onClick={handleWithdraw}
                            className={`flex text-center pt-[5px] pb-[5px] rounded-[5px]  justify-center pl-[7px] pr-[7px] gap-[10px] text-gray-300 text-[15px] w-[100px] hover:cursor-pointer`}
                        >
                            탈퇴하기
                        </div>
                    )}
                </div>
            </nav>

            {isSidebarOpen && (
                <div
                    className="w-screen h-screen z-8 bg-black/50 min-[1080px]:hidden absolute"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default Sidebar;

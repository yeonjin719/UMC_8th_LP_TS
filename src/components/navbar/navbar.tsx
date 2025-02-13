import { FaSearch } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { CiMenuBurger } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/LogInContext';
import useGetMyInfo from '../../hooks/queries/useGetMyInfo';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal, selectModal } from '../../slices/modalSlice';
import { MODAL_TYPES } from '../modal/modalProvider';

type TNavbarProps = {
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSidebarOpen: boolean;
    setIsSearchBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSearchBoxOpen: boolean;
};
type TUserData = {
    email: string;
    id: string;
};
const Navbar = ({ setIsSidebarOpen, isSidebarOpen }: TNavbarProps) => {
    const { isOpen, modalType } = useSelector(selectModal);

    const [userData, setUserData] = useState<TUserData | null>(null);
    const { isLogin, setIsLogin } = useAuthContext();
    const accessToken = localStorage.getItem('accessToken');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data, refetch } = useGetMyInfo(accessToken);

    useEffect(() => {
        if (isLogin) {
            refetch();
        }
    }, [isLogin, refetch]);

    useEffect(() => {
        if (data) {
            setUserData({ email: data.email, id: data.id });
        }
    }, [data, isLogin]);

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLogin(false);
        window.location.reload();
    };

    const handleLogout = () => {
        logout();
        localStorage.removeItem('isLogin');
    };

    const handleModalOpen = () => {
        if (isOpen === true) {
            dispatch(closeModal());
        } else {
            dispatch(openModal(MODAL_TYPES.SearchBoxModal));
        }
    };

    return (
        <nav
            className={`flex min-h-[80px] items-center px-[20px] sticky z-[10] w-[calc(100vw-40px)] bg-[#131313]`}
        >
            <CiMenuBurger
                size={20}
                color="white"
                className="mr-[20px] hover:cursor-pointer"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <div
                onClick={() => {
                    navigate('/');
                    setIsSidebarOpen(false);
                }}
                className="flex hover:cursor-pointer max-w-[100px] min-w-[50px] text-[#FF1E9D] text-[1.7rem] font-bold mr-[30px] items-center justify-center"
            >
                CATFLIX
            </div>

            <div className="flex gap-[10px] ml-auto">
                <div
                    onClick={handleModalOpen}
                    className="flex items-center gap-[10px] relative"
                >
                    {isOpen && modalType === 'SearchBoxModal' ? (
                        <FaXmark color="white" className="flex" />
                    ) : (
                        <FaSearch color="white" className="flex" />
                    )}
                </div>

                {userData ? (
                    <>
                        <div className="text-white text-[15px] flex items-center">
                            {userData.email.split('@')[0]}님 반갑습니다.
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center text-white text-[15px] border-none bg-black rounded-[5px] w-[70px] h-[30px] hover:bg-white hover:text-black"
                        >
                            로그아웃
                        </button>
                    </>
                ) : (
                    <>
                        <div
                            onClick={() => navigate('/login')}
                            className="flex items-center justify-center text-white text-[15px] border-none bg-black rounded-[5px] w-[70px] h-[30px] hover:bg-white hover:text-black"
                        >
                            로그인
                        </div>
                        <div
                            onClick={() => navigate('/signup')}
                            className="flex items-center justify-center text-white text-[15px] border-none bg-[#FF1E9D] rounded-[5px] w-[70px] h-[30px] hover:bg-white hover:text-black"
                        >
                            회원가입
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

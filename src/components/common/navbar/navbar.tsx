import { FaSearch } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { CiMenuBurger } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/LogInContext';

import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal, selectModal } from '../../../slices/modalSlice';
import { MODAL_TYPES } from '../modal/modalProvider';
import useAuth from '../../../hooks/queries/useAuth';
import useUserInfo from '../../../hooks/queries/useUserInfo';
import { useEffect } from 'react';

type TNavbarProps = {
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSidebarOpen: boolean;
};

const Navbar = ({ setIsSidebarOpen, isSidebarOpen }: TNavbarProps) => {
    const { isOpen, modalType } = useSelector(selectModal);

    const { setIsLogin, isLogin, setUserId, setNickname, userId } =
        useAuthContext();
    const accessToken = localStorage.getItem('accessToken') || '';

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { useLogout } = useAuth();
    const { mutate: logoutMutate } = useLogout;
    const { useGetMyInfo } = useUserInfo(isLogin, userId);
    const { data: userData } = useGetMyInfo;

    useEffect(() => {
        if (userData) {
            setUserId(userData?.data.id as number);
            setIsLogin(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    const handleLogout = () => {
        setIsLogin(false);
        setUserId(-1);
        setNickname('');
        localStorage.removeItem('isLogin');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        alert('로그아웃 되었습니다');
        logoutMutate(accessToken, {
            onSuccess: () => {
                navigate('/');
            },
            onError: () => {
                navigate('/');
            },
        });
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
            className={`flex min-h-[80px] items-center px-[20px] sticky z-[10] w-full bg-[#131313]`}
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
                className="flex whitespace-nowrap hover:cursor-pointer max-w-[300px] min-w-[50px] text-[#FF1E9D] text-[1.7rem] font-bold mr-[30px] items-center justify-center "
            >
                돌려돌려LP판
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

                {accessToken ? (
                    <>
                        <div
                            className="text-white text-[15px] flex items-center max-sm:hidden"
                            onClick={() => navigate('/mypage')}
                        >
                            {userData?.data.name}님 반갑습니다.
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center text-white text-[15px] border-none bg-[#131313] rounded-[5px] w-[70px] h-[30px] hover:bg-white hover:text-black"
                        >
                            로그아웃
                        </button>
                    </>
                ) : (
                    <>
                        <div
                            onClick={() => navigate('/login')}
                            className="flex items-center justify-center text-white text-[15px] border-none bg-[#131313] rounded-[5px] w-[70px] h-[30px] hover:bg-white hover:text-black"
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

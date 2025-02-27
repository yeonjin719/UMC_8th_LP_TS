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

type TNavbarProps = {
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSidebarOpen: boolean;
};

const Navbar = ({ setIsSidebarOpen, isSidebarOpen }: TNavbarProps) => {
    const { isOpen, modalType } = useSelector(selectModal);

    const { setIsLogin } = useAuthContext();
    const accessToken = localStorage.getItem('accessToken') || '';

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { useLogout } = useAuth();
    const { mutate: logoutMutate } = useLogout;
    const { useGetMyInfo } = useUserInfo();
    const { data: userData } = useGetMyInfo;

    const handleLogout = () => {
        logoutMutate(accessToken, {
            onSuccess: () => {
                localStorage.removeItem('isLogin');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                setIsLogin(false);
                alert('로그아웃 되었습니다');
                navigate('/');
            },
            onError: () => {
                alert('로그아웃 과정에서 에러가 발생했습니다');
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
                className="flex hover:cursor-pointer max-w-[300px] min-w-[50px] text-[#FF1E9D] text-[1.7rem] font-bold mr-[30px] items-center justify-center "
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
                            className="text-white text-[15px] flex items-center"
                            onClick={() => navigate('/mypage')}
                        >
                            {userData?.name}님 반갑습니다.
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

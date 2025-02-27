import Navbar from '../components/common/navbar/navbar';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/sidebar';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, selectModal } from '../slices/modalSlice';
import { MODAL_TYPES } from '../components/common/modal/modalProvider';

const RootLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { isOpen, modalType } = useSelector(selectModal);
    const dispatch = useDispatch();
    return (
        <div className="flex flex-col h-screen w-full overflow-hidden">
            <Navbar
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
            />

            <main className={`flex w-full overflow-y-hidden flex-1`}>
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <div
                    className={` ${
                        isOpen && modalType === 'SearchBoxModal'
                            ? 'overflow-hidden w-full'
                            : 'overflow-y-auto w-full'
                    }`}
                >
                    <Outlet />
                </div>
                <div
                    onClick={() => {
                        setIsSidebarOpen(false);
                        dispatch(openModal(MODAL_TYPES.AddLPModal));
                    }}
                    className={`flex w-10 h-10 justify-center items-center rounded-[50%] fixed bg-pink-500 text-white z-20 bottom-10 right-10 text-[20px]`}
                >
                    +
                </div>
            </main>
        </div>
    );
};

export default RootLayout;

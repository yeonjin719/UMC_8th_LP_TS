import Navbar from '../components/navbar/navbar';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/sidebar';
import { useState } from 'react';

const RootLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);

    return (
        <div className="flex flex-col h-screen w-full overflow-hidden">
            <Navbar
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
                isSearchBoxOpen={isSearchBoxOpen}
                setIsSearchBoxOpen={setIsSearchBoxOpen}
            />

            <main className={`flex w-full overflow-y-hidden flex-1`}>
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <div
                    className={` ${
                        isSearchBoxOpen
                            ? 'overflow-hidden w-full'
                            : 'overflow-y-auto w-full'
                    }`}
                >
                    <Outlet />
                </div>
                <div
                    onClick={() => {
                        setIsSidebarOpen(false);
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

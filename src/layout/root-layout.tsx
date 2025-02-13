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
            </main>
        </div>
    );
};

export default RootLayout;

import { Outlet } from 'react-router-dom';
import AuthNavbar from '../components/common/navbar/authNavbar';

const AuthLayout = () => {
    return (
        <div className="flex flex-col h-screen w-full">
            <AuthNavbar />
            <main className="flex flex-1 w-full mt-20 overflow-y-hidden">
                <Outlet />
            </main>
        </div>
    );
};

export default AuthLayout;

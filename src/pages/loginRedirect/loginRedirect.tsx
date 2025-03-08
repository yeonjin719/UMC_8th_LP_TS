import React, { useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useAuthContext } from '../../context/LogInContext.tsx';
import { useNavigate } from 'react-router-dom';

const LoginRedirect: React.FC = () => {
    const { setIsLogin } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('accessToken');
        const refreshToken = urlParams.get('refreshToken');

        if (accessToken && refreshToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            setIsLogin(true);
            navigate('/');
        }
    }, [navigate, setIsLogin]);

    return (
        <div className="flex w-full h-full justify-center items-center">
            <ClipLoader color={'#fff'} />
        </div>
    );
};

export default LoginRedirect;

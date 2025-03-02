import React, { useEffect } from 'react';

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
            // 로그인 성공 후 메인 페이지로 이동
            navigate('/');
        }
    }, [navigate, setIsLogin]);

    return <div>Redirecting...</div>;
};

export default LoginRedirect;

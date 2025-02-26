import React, { useEffect } from 'react';

import { useLocation } from 'react-router';
import useAuth from '../../hooks/queries/useAuth';

const LoginRedirect: React.FC = () => {
    const location = useLocation();
    const { useGoogleLogin } = useAuth();
    const { data } = useGoogleLogin;
    console.log(data);
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            // Save the token to localStorage or context
            localStorage.setItem('authToken', token);
            // Redirect to the home page or dashboard
        } else {
            // Redirect to login page if no token is found
        }
    }, [location]);

    return <div>Redirecting...</div>;
};

export default LoginRedirect;

import { useAuthContext } from '../context/LogInContext.tsx';
import { PropsWithChildren } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layout/root-layout.jsx';
import HomePage from '../pages/home/home.jsx';
import NotFound from '../pages/notFound/notFound.js';
import SignUp from '../pages/signup/signup.jsx';
import LogIn from '../pages/login/login.jsx';
import Search from '../pages/search/search.jsx';
import Category from '../pages/category/category.jsx';
import MoviesCategory from '../pages/moviesCategory/moviesCategory.jsx';
import MoviesDetail from '../pages/moviesDetail/moviesDetail.jsx';
import ProtectedPage from '../pages/protectedPage/protectedPage.tsx';
import MovieCreditDetail from '../pages/movieCreditDetail/movieCreditDetail';
import AuthLayout from '../layout/auth-layout.tsx';
import ModalProvider from '../components/modal/modalProvider.tsx';
import AddMovie from '../pages/addMovie/addMovie.tsx';
import Favorite from '../pages/favorite/favorite.tsx';
import MyPage from '../pages/mypage/mypage.tsx';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const { isLogin } = useAuthContext();

    if (isLogin === false) {
        alert('로그인이 필요한 서비스입니다. 로그인을 해주세요!');
        window.location.href = '/login';
        return;
    }

    return children;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <RootLayout />
                <ModalProvider />
            </>
        ),
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'search',
                element: <Search />,
            },
            {
                path: 'category',
                element: <Category />,
            },
            {
                path: 'movies/:movieId',
                element: <MoviesDetail />,
            },
            {
                path: 'category/:category',
                element: <MoviesCategory />,
            },
            {
                path: 'credit/:movieID',
                element: <MovieCreditDetail />,
            },
            {
                path: 'addMovie',
                element: (
                    <ProtectedRoute>
                        <AddMovie />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'favorite',
                element: (
                    <ProtectedRoute>
                        <Favorite />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'mypage',
                element: (
                    <ProtectedRoute>
                        <MyPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'protected',
                element: (
                    <ProtectedRoute>
                        <ProtectedPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: '/',
        element: <AuthLayout />,
        errorElement: <NotFound />,
        children: [
            {
                path: 'login',
                element: <LogIn />,
            },
            {
                path: 'signup',
                element: <SignUp />,
            },
        ],
    },
]);
export default router;

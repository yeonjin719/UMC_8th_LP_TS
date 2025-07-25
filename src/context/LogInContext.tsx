import {
    PropsWithChildren,
    useContext,
    createContext,
    useState,
    useEffect,
} from 'react';

interface IAuthContextValue {
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
    nickname: string;
    setNickname: (nickname: string) => void;
    userId: number;
    setUserId: (userId: number) => void;
}

const AuthContext = createContext<IAuthContextValue>({
    isLogin: false,
    setIsLogin: () => {},
    nickname: '',
    setNickname: () => {},
    userId: -1,
    setUserId: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isLogin, setIsLogin] = useState<boolean>(() => {
        return localStorage.getItem('isLogin') === 'true';
    });

    const [nickname, setNickname] = useState('');
    const [userId, setUserId] = useState(-1);

    useEffect(() => {
        localStorage.setItem('isLogin', String(isLogin));
    }, [isLogin]);

    return (
        <AuthContext.Provider
            value={{
                isLogin,
                setIsLogin,
                nickname,
                setNickname,
                userId,
                setUserId,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (context == null) {
        throw new Error('AuthProvider를 찾을 수 없습니다.');
    }

    return context;
}

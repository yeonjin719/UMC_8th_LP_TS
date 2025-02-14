import { GoogleLogin, Login, Logout, Signup, Withdraw } from '../../apis/auth';
import { useCoreMutation, useCoreQuery } from '../common/customQuery';

export default function useAuth() {
    const useSignup = useCoreMutation(Signup);
    const useLogin = useCoreMutation(Login);
    const useGoogleLogin = useCoreQuery(['googleAuth'], () => GoogleLogin);
    const useLogout = useCoreMutation(Logout);
    const useWithdraw = useCoreMutation(Withdraw);
    return { useSignup, useWithdraw, useLogout, useLogin, useGoogleLogin };
}

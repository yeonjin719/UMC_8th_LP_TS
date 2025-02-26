import { Login, Logout, Signup, Withdraw } from '../../apis/auth';
import { useCoreMutation } from '../common/customQuery';

export default function useAuth() {
    const useSignup = useCoreMutation(Signup);
    const useLogin = useCoreMutation(Login);
    const useLogout = useCoreMutation(Logout);
    const useWithdraw = useCoreMutation(Withdraw);
    return { useSignup, useWithdraw, useLogout, useLogin };
}

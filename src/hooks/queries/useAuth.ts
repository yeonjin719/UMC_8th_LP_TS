import { Login, Signup } from '../../apis/auth';
import { useCoreMutation } from '../common/customQuery';

export default function useAuth() {
    const useSignup = useCoreMutation(Signup);
    const useLogin = useCoreMutation(Login);
    return { useSignup, useLogin };
}

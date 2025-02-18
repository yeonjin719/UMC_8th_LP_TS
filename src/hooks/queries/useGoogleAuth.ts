import { GoogleLogin } from '../../apis/auth';
import { useCoreQuery } from '../common/customQuery';

export default function useAuth() {
    const useGoogleLogin = useCoreQuery(['googleAuth'], () => GoogleLogin());

    return { useGoogleLogin };
}

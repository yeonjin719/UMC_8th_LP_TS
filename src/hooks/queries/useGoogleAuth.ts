import { GoogleLogin } from '../../apis/auth';
import { useCoreQuery } from '../common/customQuery';

export default function useGoogleAuth() {
    return useCoreQuery(['googleAuth'], () => GoogleLogin());
}

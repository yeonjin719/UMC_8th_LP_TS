import { useNavigate } from 'react-router-dom';
import defaultProfile from '../../../images/default_profile.png';
interface CreditMember {
    id: number | undefined;
    profile_path: string | null | undefined;
    name?: string | undefined;
}

function Profile({ profile_path, name, id }: CreditMember) {
    const navigate = useNavigate();
    return (
        <div
            className="flex items-center gap-[10px] relative min-w-fit"
            onClick={() => navigate(`/user/${id}`)}
        >
            {profile_path ? (
                <img
                    src={profile_path}
                    alt={name}
                    className="w-[25px] h-[25px] object-cover rounded-full border-[0.5px] border-white"
                />
            ) : (
                <img
                    src={defaultProfile}
                    alt="접근할 수 있는 이미지가 없습니다"
                    className="w-[25px] h-[25px] object-cover rounded-full border-[0.5px] border-white"
                />
            )}
            <div className="flex flex-col">
                <div className="flex items-center text-white text-sm font-bold ">
                    {name}
                </div>
            </div>
        </div>
    );
}

export default Profile;

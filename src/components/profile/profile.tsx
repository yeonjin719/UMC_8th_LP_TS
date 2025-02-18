import defaultProfile from '../../images/default_profile.png';
interface CreditMember {
    id: number | undefined;
    profile_path: string | null | undefined;
    name: string | undefined;
}

function Profile({ profile_path, name }: CreditMember) {
    return (
        <div className="flex items-center gap-[10px] relative ">
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
                <div className="flex items-center text-white text-sm font-bold">
                    {name}
                </div>
            </div>
        </div>
    );
}

export default Profile;

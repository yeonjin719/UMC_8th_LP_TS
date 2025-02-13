interface CreditMember {
    id: number;
    profile_path: string;
    name: string;
    character?: string;
    job?: string;
}

function Profile({ profile_path, name, character, job }: CreditMember) {
    return (
        <div className="flex items-center gap-2 h-[100px] w-[200px] relative mb-1">
            {profile_path ? (
                <img
                    src={`https://image.tmdb.org/t/p/original${profile_path}`}
                    alt={name}
                    className="max-h-[60px] max-w-[60px] min-h-[60px] min-w-[60px] object-cover rounded-full border-[0.5px] border-white"
                />
            ) : (
                <img
                    src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
                    alt="접근할 수 있는 이미지가 없습니다"
                    className="max-h-[60px] max-w-[60px] min-h-[60px] min-w-[60px] object-cover rounded-full border-[0.5px] border-white"
                />
            )}
            <div className="flex flex-col">
                <div className="flex items-center text-white text-sm font-bold w-[110px]">
                    {name}
                </div>

                {character ? (
                    <div className="flex items-center text-[#c0c0c0] text-xs w-[110px]">
                        {character}
                    </div>
                ) : (
                    <div className="flex items-center text-[#c0c0c0] text-xs w-[110px]">
                        {job}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;

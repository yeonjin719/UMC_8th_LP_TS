import Profile from '../common/profile/profile';

const Comment = () => {
    return (
        <div className="flex items-center">
            <Profile
                id={undefined}
                profile_path={undefined}
                name={undefined}
            ></Profile>
            <div className="flex flex-col">
                <div className="text-white text-[18px]">연진</div>
                <div className="text-white">
                    이 작업 도대체 언제 끝나는 거에요?
                </div>
            </div>
        </div>
    );
};

export default Comment;

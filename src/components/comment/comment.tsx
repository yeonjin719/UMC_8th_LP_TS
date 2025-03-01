import { TComment } from '../../types/lp';
import Profile from '../common/profile/profile';

const Comment = ({ id, author, content }: TComment) => {
    return (
        <div className="flex items-center">
            <Profile id={id} profile_path={author.avatar}></Profile>
            <div className="flex flex-col">
                <div className="text-white text-[18px]">{author.name}</div>
                <div className="text-white">{content}</div>
            </div>
        </div>
    );
};

export default Comment;

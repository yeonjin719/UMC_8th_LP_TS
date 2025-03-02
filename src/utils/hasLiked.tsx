type Like = {
    id: number;
    userId: number;
    lpId: number;
};

export const hasLiked = (
    likes: Like[] | undefined,
    userId: number
): boolean => {
    return likes ? likes.some((like) => like.userId === userId) : false;
};

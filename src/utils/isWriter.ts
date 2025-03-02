export const isWriter = (
    authorId: number | undefined,
    userId: number
): boolean => {
    return authorId === userId;
};

import { axiosInstance } from './axios-instance';
type TCreateLp = {
    title: string;
    description: string;
    categoryId: number;
};
type TAuthor = {
    id: number;
    email: string;
    name: string;
    role: string;
    profileImageUrl: string | null;
};
type TCategory = {
    id: number;
    name: string;
};
export type TLp = {
    id: number;
    title: string;
    description: string;
    authorId: number;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
    author: TAuthor;
    category: TCategory;
    image: string;
    comment?: string;
};

type TBookmark = {
    userId: number;
};

type TLpDetail = {
    id: number;
    title: string;
    description: string;
    authorId: number;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
    author: TAuthor;
    category: TCategory;
    bookmarks: TBookmark[];
    isBookmarked: boolean;
    isLiked: boolean;
    likes: [];
    totalBookmarks: number;
    totalLikes: number;
};

type TGetAllLpsResponse = TLp[];
const CreateLp = async ({
    title,
    description,
    categoryId,
}: TCreateLp): Promise<{
    isSuccess: boolean;
    code: string;
    message: string;
}> => {
    const accessToken = localStorage.getItem('accessToken') || '';

    const { data } = await axiosInstance.post(
        '/v1/lps',
        {
            title: title,
            description: description,
            categoryId: categoryId,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return data;
};

const GetAllLps = async ({
    categoryId,
}: {
    categoryId: number;
}): Promise<TGetAllLpsResponse> => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const { data } = await axiosInstance.get(
        `/v1/lps?categoryId=${categoryId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return data;
};

const GetLpDetails = async ({ id }: { id: number }): Promise<TLpDetail> => {
    const accessToken = localStorage.getItem('accessToken') || '';

    const { data } = await axiosInstance.get(`/v1/lps/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return data;
};

export { CreateLp, GetLpDetails, GetAllLps };

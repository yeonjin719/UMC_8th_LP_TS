import {
    TCommentResponse,
    TCreateLp,
    TDeleteCommentResponse,
    TGetCommentsRequest,
    TGetLPsRequest,
    TGetLPsResponse,
    TLPComments,
    TLpDelete,
    TLpDetail,
    TPostLP,
    TTagList,
    TTagsListResponse,
} from '../types/lp';
import { axiosInstance } from './axios-instance';

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
const getLPs = async ({
    cursor,
    limit,
    search,
    order,
}: TGetLPsRequest): Promise<TGetLPsResponse> => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const { data } = await axiosInstance.get(`v1/lps`, {
        params: { cursor, limit, search, order },
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return data;
};
const getLPWithTag = async ({
    cursor,
    tagName,
    limit,
    search,
    order,
}: TGetLPsRequest): Promise<TGetLPsResponse> => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const { data } = await axiosInstance.get(`v1/lps/tag/${tagName}`, {
        params: { cursor, limit, search, order },
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return data;
};

const getLikesMeLPs = async ({
    cursor,
    limit,
    search,
    order,
}: TGetLPsRequest): Promise<TGetLPsResponse> => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const { data } = await axiosInstance.get(`v1/lps/likes/me`, {
        params: { cursor, limit, search, order },
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
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

const deleteLP = async ({ lpsId }: { lpsId: number }): Promise<TLpDelete> => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const { data } = await axiosInstance.delete(`/v1/lps/${lpsId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return data;
};

const getComments = async ({
    lpsId,
    cursor,
    limit,
}: TGetCommentsRequest): Promise<TLPComments> => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const { data } = await axiosInstance.get(`/v1/lps/${lpsId}/comments`, {
        params: { cursor, limit },
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return data;
};

const postLP = async ({
    title,
    content,
    thumnail,
    tags,
    published,
}: TPostLP) => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const { data } = await axiosInstance.post(
        `/v1/lps`,
        {
            title,
            content,
            thumnail,
            tags,
            published,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return data;
};

const getTags = async ({
    search,
    order,
    cursor,
    limit,
}: TTagList): Promise<TTagsListResponse> => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const { data } = await axiosInstance.get(`/v1/tags`, {
        params: { cursor, limit, order, search },
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return data;
};

const postComment = async ({
    lpId,
    content,
}: {
    lpId: number;
    content: string;
}): Promise<TCommentResponse> => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const { data } = await axiosInstance.post(
        `/v1/lps/${lpId}/comments`,
        {
            content,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return data;
};

const deleteComment = async ({
    lpsId,
    commentId,
}: {
    lpsId: number;
    commentId: number;
}): Promise<TDeleteCommentResponse> => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const { data } = await axiosInstance.delete(
        `/v1/lps/${lpsId}/comments/${commentId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return data;
};

const patchComment = async ({
    lpsId,
    commentId,
    content,
}: {
    lpsId: number;
    commentId: number;
    content: string;
}): Promise<TDeleteCommentResponse> => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const { data } = await axiosInstance.patch(
        `/v1/lps/${lpsId}/comments/${commentId}`,
        { content },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return data;
};

export {
    CreateLp,
    patchComment,
    getLikesMeLPs,
    postLP,
    GetLpDetails,
    getLPs,
    deleteLP,
    getComments,
    getLPWithTag,
    getTags,
    postComment,
    deleteComment,
};

import { TOrder } from '../constants/enum';
import { TCommonResponse } from './common';

export type TLp = {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    thumbnail: string;
    published: boolean;
};

export type TGetLPsRequest = {
    cursor?: number;
    limit?: number;
    search?: string;
    order: TOrder;
};

export type TGetLPsResponse = TCommonResponse<{
    data: TLp[];
    nextCursor: number;
    hasNext: boolean;
}>;

export type TLpDetail = TCommonResponse<{
    id: number;
    title: string;
    content: string;
    thumbnail: string | null;
    published: boolean;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
    author: TAuthor;
    tags: TTags[];
}>;

export type TCreateLp = {
    title: string;
    description: string;
    categoryId: number;
};

export type TLpDelete = {
    status: boolean;
    statusCode: number;
    message: string;
    data: null;
};

export type TLPComments = TCommonResponse<{
    data: TComment[];
    nextCursor: number;
    hasNext: boolean;
}>;

export type TGetCommentsRequest = {
    lpsId: number;
    cursor?: number;
    limit?: number;
};

export type TComment = {
    id: number;
    content: string;
    lpId: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    author: TAuthor;
};

export type TPostLP = {
    title: string;
    content: string;
    thumnail: string;
    tags: string[];
    published: boolean;
};

type TAuthor = {
    id: number;
    email: string;
    name: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
};
type TTags = {
    id: number;
    name: string;
};

export type TBookmark = {
    userId: number;
};

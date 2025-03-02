import { TOrder, TSearchEnum } from '../constants/enum';
import { TCommonResponse } from './common';

// 공통 타입 정의
export type TAuthor = {
    id: number;
    email: string;
    name: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
};

export type TTags = {
    id: number;
    name: string;
};

export type TLikes = {
    id: number;
    userId: number;
    lpId: number;
};

// LP 관련 타입
export type TLp = {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    thumbnail: string | null;
    published: boolean;
};

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
    likes: TLikes[];
}>;

export type TCreateLp = {
    title: string;
    description: string;
    categoryId: number;
};

export type TPostLP = {
    title: string;
    content: string;
    thumbnail: string; // 오타 수정
    tags: string[];
    published: boolean;
};

export type TPatchLPRequest = Omit<TPostLP, 'lpsId'> & {
    lpsId: number;
};

export type TLpDelete = TCommonResponse<null>;

// 검색 및 페이지네이션 관련 타입
export type TGetLPsRequest = {
    cursor?: number | null;
    limit?: number;
    search?: string;
    order: TOrder;
    type?: TSearchEnum;
    tagName?: string;
};

export type TGetPageWithUserId = TGetLPsRequest & {
    userId: number;
};

export type TGetLPsResponse = TCommonResponse<{
    data: TLp[];
    nextCursor: number;
    hasNext: boolean;
}>;

export type TTagList = {
    cursor?: number;
    limit?: number;
    search?: string;
    order?: TOrder;
};

export type TTagsListResponse = TCommonResponse<{
    data: TTags[];
    nextCursor: number;
    hasNext: boolean;
}>;

// 댓글 관련 타입
export type TComment = {
    id: number;
    content: string;
    lpId: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    author: TAuthor;
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

export type TPostComment = Omit<TComment, 'author'>;

export type TCommentResponse = TCommonResponse<TPostComment>;

export type TDeleteCommentResponse = TCommonResponse<{ message: string }>;

// 좋아요 및 북마크 타입
export type TLikesResponse = TCommonResponse<TLikes>;

export type TBookmark = {
    userId: number;
};

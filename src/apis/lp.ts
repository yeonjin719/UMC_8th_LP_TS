import {
    TCreateLp,
    TGetCommentsRequest,
    TGetLPsRequest,
    TGetLPsResponse,
    TLPComments,
    TLpDelete,
    TLpDetail,
    TPostLP,
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

// const GetAllLps = async ({
//     categoryId,
// }: {
//     categoryId: number;
// }): Promise<TGetAllLpsResponse> => {
//     const accessToken = localStorage.getItem('accessToken') || '';
//     const { data } = await axiosInstance.get(
//         `/v1/lps?categoryId=${categoryId}`,
//         {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         }
//     );
//     return data;
// };

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
export { CreateLp, postLP, GetLpDetails, getLPs, deleteLP, getComments };

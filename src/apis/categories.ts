import { axiosInstance } from './axios-instance';
type TCategory = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
};
type TGetCategories = TCategory[];
const GetCategories = async (): Promise<TGetCategories> => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const { data } = await axiosInstance.get('/v1/categories', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return data;
};

export { GetCategories };

import { axiosUserInstance } from './axios-instance';
type TCategory = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
};
type TGetCategories = TCategory[];
const GetCategories = async (): Promise<TGetCategories> => {
    const { data } = await axiosUserInstance.get('/v1/categories');
    return data;
};

export { GetCategories };

import { useState } from 'react';
import Order from '../../components/common/order/order';
import PaginationBar from '../../components/common/paginationBar/paginationBar';
import LpCard from '../../components/LpCard/LpCard';
import { TOrder } from '../../constants/enum';

const HomePage = () => {
    const [order, setOrder] = useState<TOrder>(TOrder.LATEST);
    return (
        <div className="flex flex-col items-center border-t border-gray-800 py-5">
            <div className="flex w-[80%] justify-end">
                <Order setOrder={setOrder} order={order} />
            </div>
            <div className="flex flex-col w-full gap-2 items-center min-h-[75vh] h-fit-content justify-center">
                <LpCard
                    id={0}
                    title={'rosie'}
                    description={'로제의 솔로앨범'}
                    authorId={0}
                    categoryId={0}
                    createdAt={'2025-02-25'}
                    updatedAt={''}
                    author={{
                        id: 0,
                        email: 'kyj0719@gmail.com',
                        name: '코튼',
                        role: 'USER',
                        profileImageUrl: null,
                    }}
                    category={{
                        id: 0,
                        name: '',
                    }}
                    image={''}
                ></LpCard>
                <LpCard
                    id={0}
                    title={'rosie'}
                    description={'로제의 솔로앨범'}
                    authorId={0}
                    categoryId={0}
                    createdAt={'2025-02-25'}
                    updatedAt={''}
                    author={{
                        id: 0,
                        email: 'kyj0719@gmail.com',
                        name: '코튼',
                        role: 'USER',
                        profileImageUrl: null,
                    }}
                    category={{
                        id: 0,
                        name: '',
                    }}
                    image={''}
                ></LpCard>
                <LpCard
                    id={0}
                    title={'rosie'}
                    description={'로제의 솔로앨범'}
                    authorId={0}
                    categoryId={0}
                    createdAt={'2025-02-25'}
                    updatedAt={''}
                    author={{
                        id: 0,
                        email: 'kyj0719@gmail.com',
                        name: '코튼',
                        role: 'USER',
                        profileImageUrl: null,
                    }}
                    category={{
                        id: 0,
                        name: '',
                    }}
                    image={''}
                ></LpCard>
                <LpCard
                    id={0}
                    title={'rosie'}
                    description={'로제의 솔로앨범'}
                    authorId={0}
                    categoryId={0}
                    createdAt={'2025-02-25'}
                    updatedAt={''}
                    author={{
                        id: 0,
                        email: 'kyj0719@gmail.com',
                        name: '코튼',
                        role: 'USER',
                        profileImageUrl: null,
                    }}
                    category={{
                        id: 0,
                        name: '',
                    }}
                    image={''}
                ></LpCard>
                <LpCard
                    id={0}
                    title={'rosie'}
                    description={'로제의 솔로앨범'}
                    authorId={0}
                    categoryId={0}
                    createdAt={'2025-02-25'}
                    updatedAt={''}
                    author={{
                        id: 0,
                        email: 'kyj0719@gmail.com',
                        name: '코튼',
                        role: 'USER',
                        profileImageUrl: null,
                    }}
                    category={{
                        id: 0,
                        name: '',
                    }}
                    image={''}
                ></LpCard>
            </div>
            <div className="w-full flex justify-center">
                <PaginationBar />
            </div>
        </div>
    );
};

export default HomePage;

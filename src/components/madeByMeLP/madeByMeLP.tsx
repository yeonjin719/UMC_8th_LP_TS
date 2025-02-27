import PaginationBar from '../common/paginationBar/paginationBar';
import LpCard from '../LpCard/LpCard';
export default function MadeByMeLP() {
    return (
        <div className="flex flex-col items-center border-t border-gray-800 py-5 w-full">
            <div className="flex flex-col w-full gap-2 items-center min-h-[75vh] h-fit-content">
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
}

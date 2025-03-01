import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

interface PaginationBarProps {
    setCurrentPage: (currentPage: number) => void;
    currentPage: number;
    hasNextPage?: boolean;
}

const PaginationBar: React.FC<PaginationBarProps> = ({
    setCurrentPage,
    currentPage,
    hasNextPage,
}) => {
    return (
        <div className="flex justify-center items-center gap-2 mt-10">
            <button
                className={`text-white w-10 h-10 rounded-md flex justify-center items-center `}
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                <IoIosArrowBack
                    size={20}
                    color={`${currentPage !== 0 ? 'white' : 'black'}`}
                />
            </button>
            <div
                className={`w-10 h-10 rounded-md text-white flex justify-center items-center cursor-pointer bg-[rgba(40,41,46)]}`}
                key={currentPage}
            >
                {currentPage + 1}
            </div>

            <button
                className={`text-white w-10 h-10 rounded-md flex justify-center items-center`}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={!hasNextPage}
            >
                <IoIosArrowForward
                    size={20}
                    color={`${hasNextPage ? 'white' : 'black'}`}
                />
            </button>
        </div>
    );
};

export default PaginationBar;

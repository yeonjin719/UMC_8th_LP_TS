import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { getPageNumbers } from '../../../utils/getPageNumbers';
import { useState } from 'react';

const PaginationBar = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const data = {
        result: {
            totalPage: 18,
        },
    };
    return (
        <div className="flex justify-center items-center gap-2 mt-10">
            <button
                className="text-white bg-[rgba(40,41,46)] w-10 h-10 rounded-md flex justify-center items-center"
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                <IoIosArrowBack size={20} />
            </button>
            {data?.result &&
                getPageNumbers({
                    totalPages: data.result.totalPage,
                    currentPage,
                }).map((pageIndex) => (
                    <div
                        className={`w-10 h-10 rounded-md text-white flex justify-center items-center cursor-pointer ${
                            pageIndex === currentPage
                                ? 'bg-gray-500'
                                : 'bg-[rgba(40,41,46)]'
                        }`}
                        key={pageIndex}
                        onClick={() => setCurrentPage(pageIndex)}
                    >
                        {pageIndex + 1}
                    </div>
                ))}

            <button
                className="text-white bg-[rgba(40,41,46)] w-10 h-10 rounded-md flex justify-center items-center"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === data.result.totalPage - 1}
            >
                <IoIosArrowForward size={20} />
            </button>
        </div>
    );
};

export default PaginationBar;

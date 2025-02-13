import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaXmark } from 'react-icons/fa6';

import { FaSearch } from 'react-icons/fa';
import Portal from '../../components/portal/portal';
import { useDispatch, useSelector } from 'react-redux';
import {
    addSearchRecord,
    removeAllRecord,
    removeSearchRecord,
    selectSearch,
} from '../../slices/searchSlice';
type TSearchBoxProps = {
    onClose: () => void;
};
const SearchBox = ({ onClose }: TSearchBoxProps) => {
    const urlParams = new URLSearchParams(location.search);
    const keyword = urlParams.get('keyword') || '';
    const initialValue = keyword;
    const [searchValue, setSearchValue] = useState(initialValue);
    const { searchRecord } = useSelector(selectSearch);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const handler = setTimeout(() => {
            if (!searchValue.trim() || keyword === searchValue) return;
            navigate(`/search?keyword=${searchValue}`);
            dispatch(addSearchRecord(searchValue));
        }, 1500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchValue, navigate, keyword, dispatch]);

    const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSearchMovie = () => {
        if (keyword === searchValue) return;
        navigate(`/search?keyword=${searchValue}`);
        onClose();
    };

    const handleSearchMovieWithKeyboard = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === 'Enter') {
            handleSearchMovie();
            dispatch(addSearchRecord(searchValue));
            onClose();
        }
    };

    return (
        <Portal>
            <div className="flex flex-col w-full items-center absolute left-0 top-0 h-full ">
                <div className={`w-screen flex justify-center h-full`}>
                    <div
                        className={`w-full flex flex-col items-center z-7 h-[50vh] bg-[#131313] absolute left-0 top-0`}
                    >
                        <div className="w-[50%] relative flex pt-[80px] ">
                            <FaSearch
                                color="white"
                                className="absolute left-0 top-23.5"
                                size={20}
                            />
                            <input
                                className="border-b-white border-b-[1px] w-full h-[50px] text-white pl-[30px] outline-none text-[20px]"
                                defaultValue={initialValue}
                                onChange={onChangeSearchValue}
                                onKeyDown={handleSearchMovieWithKeyboard}
                                type="text"
                                autoFocus
                            ></input>
                        </div>
                        <div className="w-[50%] flex-1 pt-[20px]">
                            <div className="flex pb-[10px] gap-[10px] items-end">
                                <div className="text-white text-[20px] ">
                                    최근 검색어
                                </div>
                                <div
                                    className="text-gray-500 text-[13px]"
                                    onClick={() => dispatch(removeAllRecord())}
                                >
                                    모두 지우기
                                </div>
                            </div>
                            <div className="flex flex-col gap-[5px]">
                                {searchRecord &&
                                    searchRecord
                                        .slice()
                                        .reverse()
                                        .map((record, idx) => (
                                            <div className="flex items-center gap-[5px]">
                                                <FaXmark
                                                    color="white"
                                                    size={15}
                                                    onClick={() =>
                                                        dispatch(
                                                            removeSearchRecord(
                                                                record
                                                            )
                                                        )
                                                    }
                                                ></FaXmark>
                                                <div
                                                    key={idx}
                                                    className="text-white cursor-pointer"
                                                    onClick={() =>
                                                        setSearchValue(record)
                                                    }
                                                >
                                                    {record}
                                                </div>
                                            </div>
                                        ))}
                            </div>
                        </div>
                    </div>

                    <div
                        className="absolute w-screen h-full bg-black/50 z-6 left-0 top-0"
                        onClick={onClose}
                    ></div>
                </div>
            </div>
        </Portal>
    );
};

export default SearchBox;

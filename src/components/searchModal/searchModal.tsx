import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaXmark } from 'react-icons/fa6';
import { IoIosArrowDown } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import Portal from '../common/portal/portal';
import { useDispatch, useSelector } from 'react-redux';
import {
    addSearchRecord,
    removeAllRecord,
    removeSearchRecord,
    selectSearch,
} from '../../slices/searchSlice';
import { TSearchEnum, TSearchLabel } from '../../constants/enum';

type TSearchModalProps = {
    onClose: () => void;
};

const englishType = {
    [TSearchEnum.TITLE]: 'title',
    [TSearchEnum.TAG]: 'tag',
} as const;

const SearchModal = ({ onClose }: TSearchModalProps) => {
    const location = useLocation();
    const searchParams = useMemo(
        () => new URLSearchParams(location.search),
        [location.search]
    );
    const keyword = searchParams.get('keyword') || '';
    const initialValue = keyword;
    const type = localStorage.getItem('type') || TSearchEnum.TITLE;
    const [searchValue, setSearchValue] = useState(initialValue);
    const [toggleOpen, setToggleOpen] = useState(false);
    const [searchType, setSearchType] = useState<TSearchEnum>(
        type as TSearchEnum
    );
    const { searchRecord } = useSelector(selectSearch);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!searchValue.trim()) return;
        const type = englishType[searchType];
        if (type === 'title') {
            localStorage.setItem('type', 'title');
        } else {
            localStorage.setItem('type', 'tag');
        }

        const handler = setTimeout(() => {
            if (!searchValue.trim() || keyword === searchValue) return;
            navigate(`/search/?type=${type}&keyword=${searchValue}`);
            dispatch(addSearchRecord(searchValue));
        }, 1500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchValue, navigate, keyword, searchType, dispatch]);

    const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSearchMovie = () => {
        if (!searchValue.trim() || keyword === searchValue) return;
        if (keyword === searchValue) return;
        const type = englishType[searchType];
        localStorage.setItem('type', searchType);
        navigate(`/search?type=${type}&keyword=${searchValue}`);
        onClose();
    };

    const handleSearchMovieWithKeyboard = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === 'Enter' && searchValue.trim()) {
            handleSearchMovie();
            dispatch(addSearchRecord(searchValue));
            onClose();
        }
    };

    return (
        <Portal>
            <div className="flex flex-col w-full items-center absolute left-0 top-0 h-[100%] overflow-hidden">
                <div className={`w-[100%] flex justify-center h-full`}>
                    <div
                        className={`w-[100%] flex flex-col items-center z-7 h-[50vh] bg-[#131313] absolute left-0 top-0 `}
                    >
                        <div className="w-[50%] min-w-[420px] relative flex pt-[95px] min-[1080px]:ml-[200px]">
                            <FaSearch
                                color="white"
                                className="absolute left-0 top-28"
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
                            <div
                                onClick={() => setToggleOpen(!toggleOpen)}
                                className={`text-white flex ml-[5px] relative self-end items-center min-w-[92px] justify-center border-gray-300 border-[1px] h-[35px] pt-[3px] pb-[3px] hover:cursor-pointer
                                    ${
                                        toggleOpen
                                            ? 'rounded-b-0 rounded-t-[8px]'
                                            : 'rounded-[8px]'
                                    }
                                    `}
                            >
                                {TSearchLabel[searchType]}
                                <IoIosArrowDown
                                    color="white"
                                    className="absolute right-[4px]"
                                />
                                {toggleOpen && (
                                    <div className="absolute top-[34px] rounded-b-[8px] left-[-1px] w-full">
                                        <div
                                            onClick={() =>
                                                setSearchType(TSearchEnum.TITLE)
                                            }
                                            className={`w-[92px] justify-center flex items-center py-1 hover:bg-white hover:text-black hover:cursor-pointer
                                            ${
                                                searchType === TSearchEnum.TITLE
                                                    ? 'bg-pink-500'
                                                    : 'bg-black'
                                            }
                                            `}
                                        >
                                            제목
                                        </div>
                                        <div
                                            onClick={() =>
                                                setSearchType(TSearchEnum.TAG)
                                            }
                                            className={`w-[92px] justify-center flex items-center rounded-b-[4px] py-1 hover:bg-white hover:text-black hover:cursor-pointer
                                            ${
                                                searchType === TSearchEnum.TAG
                                                    ? 'bg-pink-500'
                                                    : 'bg-black'
                                            }
                                            `}
                                        >
                                            태그
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-[50%] min-w-[420px] flex-1 pt-[20px]  min-[1080px]:ml-[200px]">
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
                        className="absolute w-screen h-full bg-black opacity-10 z-6 left-0 top-0"
                        onClick={onClose}
                    ></div>
                </div>
            </div>
        </Portal>
    );
};

export default SearchModal;

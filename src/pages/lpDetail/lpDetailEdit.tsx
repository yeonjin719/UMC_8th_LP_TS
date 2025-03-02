import { useParams } from 'react-router-dom';
import Profile from '../../components/common/profile/profile';
import { formatRelativeTime } from '../../utils/transformDate';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import usePatchLP from '../../hooks/queries/usePatchLP';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TLpDetail, TPatchLPRequest } from '../../types/lp';
import { zodResolver } from '@hookform/resolvers/zod';
import { addLpSchema } from '../../utils/validate';
import useGetTags from '../../hooks/queries/useGetTags';
import useDebounce from '../../hooks/common/useDebounce';
import { useInView } from 'react-intersection-observer';
import { FaImage } from 'react-icons/fa';
import { queryClient } from '../../main';

type TLPDetailEdit = {
    setEdit: (edit: boolean) => void;
    setAddTag: (tag: string[]) => void;
    addTag: string[];
    data: TLpDetail | undefined;
    handleDeleteLP: () => void;
};

const LpDetailEdit = ({
    setEdit,
    setAddTag,
    addTag,
    data,
    handleDeleteLP,
}: TLPDetailEdit) => {
    const { lpId } = useParams();

    const [imageSrc, setImageSrc] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [showTagList, setShowTagList] = useState(false);
    const tagListRef = useRef<HTMLDivElement | null>(null);

    const { mutate: patchMutate } = usePatchLP();
    const debouncedTagInput = useDebounce(tagInput, 5000);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        data: tagData,
        fetchNextPage,
        hasNextPage,
        isFetching,
    } = useGetTags({
        search: debouncedTagInput,
        limit: 5,
    });
    const { register, handleSubmit } = useForm<TPatchLPRequest>({
        mode: 'onChange',
        resolver: zodResolver(addLpSchema),
        defaultValues: {
            title: data?.data.title || '',
            content: data?.data.content || '',
        },
    });

    const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(e.target.value);
        setShowTagList(true);
    };

    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView) {
            if (!isFetching && hasNextPage) {
                fetchNextPage();
            }
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    const handleAddTag = (value: string | null) => {
        const newTag = value || tagInput.trim();

        if (newTag && !addTag.includes(newTag)) {
            setAddTag([...addTag, newTag]);
        }
        setTagInput('');
        setShowTagList(false);
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setAddTag(addTag.filter((tag) => tag !== tagToRemove));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                tagListRef.current &&
                !tagListRef.current.contains(event.target as Node)
            ) {
                setShowTagList(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file && file != null) {
            const imageUrl = URL.createObjectURL(file);
            setImageSrc(imageUrl);
        }
    };

    const onSubmit: SubmitHandler<TPatchLPRequest> = (submitData) => {
        patchMutate(
            {
                title: submitData.title,
                content: submitData.content,
                thumnail: imageSrc,
                tags: addTag,
                published: true,
                lpsId: Number(lpId),
            },
            {
                onSuccess: () => {
                    setEdit(false);
                    queryClient.invalidateQueries({ queryKey: ['getLps'] });
                },
                onError: () => {
                    alert('에러발생!');
                },
            }
        );
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full h-full items-center"
        >
            <div className="flex flex-col w-[80%] gap-[15px] justify-center items-center bg-[rgba(40,41,46)] rounded-[15px] p-[30px] relative">
                <div className="flex gap-[40px] w-[80%] justify-between">
                    <Profile
                        profile_path={data?.data.author?.avatar}
                        id={data?.data.author?.id}
                        name={data?.data.author?.name}
                    ></Profile>
                    <div className="text-white">
                        {formatRelativeTime(data?.data.createdAt)}
                    </div>
                </div>
                <div className="relative w-[80%]">
                    <input
                        type="text"
                        {...register('title')}
                        className="text-white text-[25px] border-1 border-white w-[80%] rounded-md px-5"
                    />
                    <div className="absolute flex gap-[15px] right-0 top-[10px]">
                        <FaImage
                            color="white"
                            size={20}
                            onClick={() => fileInputRef.current?.click()}
                        />
                        <FaCheck
                            color="white"
                            size={20}
                            onClick={handleSubmit(onSubmit)}
                        />
                        <FaRegTrashAlt
                            color="white"
                            size={20}
                            onClick={handleDeleteLP}
                        />
                    </div>
                </div>

                <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />
                {imageSrc && (
                    <img
                        src={imageSrc}
                        alt=""
                        onClick={handleImageClick}
                        className="w-[80%] hover:cursor-pointer hover:opacity-70"
                    />
                )}

                <input
                    type="text"
                    className="text-white w-[80%] border-white border-1 rounded-md p-5"
                    {...register('content')}
                />
                <div className="flex gap-2 w-[80%] items-center mb-2 relative">
                    <input
                        className="w-full h-[40px] border-gray-500 text-white border rounded-md p-2"
                        placeholder="LP Tag"
                        value={tagInput}
                        onClick={() => setShowTagList(true)}
                        onChange={onChangeSearchValue}
                    />
                    {showTagList && (
                        <div
                            className="flex absolute flex-wrap border-gray-500 border-[0.1px] left-0 top-[40px] w-[86%] max-h-[140px] overflow-y-scroll rounded-md z-2 "
                            ref={tagListRef}
                        >
                            {tagData?.pages.map((page) =>
                                page.data.data.map((tag) => (
                                    <span
                                        key={tag.id}
                                        className="border-gray-500 bg-[rgba(40,41,46)] text-white h-[40px] border-[0.1px] w-full px-2 py-1 text-sm flex items-center hover:cursor-pointer "
                                        onClick={() => handleAddTag(tag.name)}
                                    >
                                        #{tag.name}
                                    </span>
                                ))
                            )}
                            <div
                                ref={ref}
                                className="flex w-full justify-center h-auto"
                            ></div>
                        </div>
                    )}

                    <button
                        type="button"
                        className="w-[80px] h-[40px] bg-pink-500 rounded-md p-2 disabled:bg-gray-400"
                        onClick={() => handleAddTag(null)}
                        disabled={!tagInput.trim()}
                    >
                        Add
                    </button>
                </div>
                <div className="flex flex-wrap gap-[10px] mt-4 w-full  justify-center ">
                    {addTag.map((tag, idx) => {
                        return (
                            <div
                                key={idx}
                                className="bg-gray-700 text-white px-3 py-1 rounded-full flex items-center gap-2"
                            >
                                #{tag}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                >
                                    <IoMdClose />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </form>
    );
};
export default LpDetailEdit;

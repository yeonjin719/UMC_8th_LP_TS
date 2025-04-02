import { useState, useRef, useEffect } from 'react';
import Portal from '../common/portal/portal';
import LPComponents from '../LPComponents/LPComponents';
import { IoMdClose } from 'react-icons/io';
import usePostLP from '../../hooks/queries/usePostLP';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TPostLP } from '../../types/lp';
import { addLpSchema } from '../../utils/validate';
import useGetTags from '../../hooks/queries/useGetTags';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../hooks/common/useDebounce';
import { queryClient } from '../../main';

type TSearchModalProps = {
    onClose: () => void;
};

const AddLPModal = ({ onClose }: TSearchModalProps) => {
    const navigate = useNavigate();
    const [addTag, setAddTag] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [showTagList, setShowTagList] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const tagListRef = useRef<HTMLDivElement | null>(null);
    const { mutate: postMutate } = usePostLP();
    const debouncedTagInput = useDebounce(tagInput, 5000);

    const { data, fetchNextPage, hasNextPage, isFetching } = useGetTags({
        search: debouncedTagInput,
        limit: 5,
    });
    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<TPostLP>({
        mode: 'onChange',
        resolver: zodResolver(addLpSchema),
    });
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setImageSrc(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

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

    const onSubmit: SubmitHandler<TPostLP> = (submitData) => {
        postMutate(
            {
                title: submitData.title,
                content: submitData.content,
                thumbnail: imageSrc,
                tags: addTag,
                published: true,
            },
            {
                onSuccess: () => {
                    onClose();
                    queryClient.invalidateQueries({ queryKey: ['getLps'] });
                    navigate('/');
                },
                onError: () => {
                    alert('에러발생!');
                },
            }
        );
    };

    return (
        <Portal>
            <div className="absolute top-0 left-0 flex flex-col items-center w-full h-full overflow-hidden text-white">
                <form
                    className="flex flex-col items-center justify-center w-full h-full "
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col w-[400px] bg-[rgba(40,41,46)] rounded-2xl px-5 py-10 gap-2 items-center z-11 relative">
                        {/* 이미지 업로드 */}
                        <IoMdClose
                            className="absolute cursor-pointer top-6 z-2 right-6"
                            onClick={onClose}
                            size={20}
                        />
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <div
                            className="h-[230px] w-full cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <LPComponents imageSrc={imageSrc} />
                        </div>

                        <input
                            className="w-full h-10 p-2 mt-5 mb-2 border border-gray-500 rounded-md"
                            placeholder="LP Name"
                            {...register('title')}
                        />
                        <input
                            className="w-full h-10 p-2 mb-2 border border-gray-500 rounded-md"
                            placeholder="LP Content"
                            {...register('content')}
                        />

                        <div className="relative flex items-center w-full gap-2 mb-2">
                            <input
                                className="w-full h-[40px] border-gray-500 border rounded-md p-2"
                                placeholder="LP Tag"
                                value={tagInput}
                                onClick={() => setShowTagList(true)}
                                onChange={onChangeSearchValue}
                            />
                            {showTagList && (
                                <div
                                    className="flex absolute flex-wrap border-gray-500 border-[0.1px] left-0 top-[40px] w-[79%] max-h-[140px] overflow-y-scroll rounded-md z-2"
                                    ref={tagListRef}
                                >
                                    {data?.pages.map((page) =>
                                        page.data.data.map((tag) => (
                                            <span
                                                key={tag.id}
                                                className="border-gray-500 bg-[rgba(40,41,46)] h-[40px] border-[0.1px] w-full px-2 py-1 text-sm flex items-center hover:cursor-pointer "
                                                onClick={() =>
                                                    handleAddTag(tag.name)
                                                }
                                            >
                                                #{tag.name}
                                            </span>
                                        ))
                                    )}
                                    <div
                                        ref={ref}
                                        className="flex justify-center w-full h-auto"
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
                        <div className="flex flex-wrap w-full gap-2">
                            {addTag.map((tag) => (
                                <span
                                    key={tag}
                                    className="border-gray-500 rounded-md bg-[rgba(40,41,46)] h-[40px] border-[0.1px] px-2 py-1 text-sm flex items-center gap-2"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag)}
                                    >
                                        <IoMdClose />
                                    </button>
                                </span>
                            ))}
                        </div>
                        {/* 추가 버튼 */}
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="w-full h-10 p-2 mt-4 bg-pink-500 rounded-md disabled:cursor-not-allowed disabled:bg-gray-400"
                        >
                            Add LP
                        </button>
                    </div>
                </form>
            </div>
            <div
                className="absolute top-0 left-0 w-screen h-full bg-black opacity-50 z-6"
                onClick={onClose}
            ></div>
        </Portal>
    );
};

export default AddLPModal;

import { useState } from 'react';
import Portal from '../portal/portal';
import LPComponents from '../LPComponents/LPComponents';

type TSearchModalProps = {
    onClose: () => void;
};

const AddLPModal = ({ onClose }: TSearchModalProps) => {
    const [addTag, setAddTag] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [imageSrc, setImageSrc] = useState('');

    const handleAddTag = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (tagInput.trim()) {
            setAddTag([...addTag, tagInput.trim()]);
            setTagInput('');
        }
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
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <Portal>
            <div className="flex flex-col w-full items-center absolute left-0 top-0 h-full overflow-hidden text-white">
                <form
                    className="flex flex-col items-center justify-center w-full h-full "
                    onSubmit={handleFormSubmit}
                >
                    <div className="flex flex-col w-[400px] bg-[rgba(40,41,46)] rounded-2xl p-5 gap-2 items-center z-8">
                        <input
                            type="file"
                            id="imageInput"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <div className="h-[230px] w-full">
                            <LPComponents imageSrc={imageSrc}></LPComponents>
                        </div>

                        <input
                            className="w-full h-10 border-gray-500 border-1 rounded-md p-2 mb-2 mt-5"
                            placeholder="LP Name"
                        />
                        <input
                            className="w-full h-10 border-gray-500 border-1 rounded-md p-2 mb-2"
                            placeholder="LP Content"
                        />
                        <div className="flex gap-2 w-full items-center mb-2">
                            <input
                                className="w-full h-[40px] border-gray-500 border-1 rounded-md p-2"
                                placeholder="LP Tag"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                            />
                            <button
                                type="button"
                                className="w-[80px] h-[40px] bg-pink-500 rounded-md p-2 disabled:bg-gray-400"
                                onClick={handleAddTag}
                                disabled={!tagInput.trim()}
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2 w-full">
                            {addTag.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-600 px-2 py-1 rounded-md text-sm"
                                >
                                    # {tag}
                                </span>
                            ))}
                        </div>
                        <button
                            type="submit"
                            className="w-full h-10 bg-pink-500 rounded-md p-2 mt-4"
                        >
                            Add LP
                        </button>
                    </div>
                </form>
            </div>
            <div
                className="absolute w-screen h-full bg-black opacity-50 z-6 left-0 top-0"
                onClick={onClose}
            ></div>
        </Portal>
    );
};

export default AddLPModal;

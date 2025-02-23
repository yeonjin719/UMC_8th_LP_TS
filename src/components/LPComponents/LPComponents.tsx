import LP from '../../../public/lp.png';
type TLPComponents = {
    imageSrc?: string;
    isHasInput?: boolean;
};

const LPComponents = ({ imageSrc, isHasInput }: TLPComponents) => {
    return (
        <div className="relative w-full flex justify-center h-full">
            <img
                src={imageSrc || LP}
                alt="LP 사진"
                className={`w-[65%] object-cover cursor-pointer z-1 aspect-square
                  ${imageSrc && 'absolute left-[10px] shadow-2xs'}
                `}
                onClick={() => {
                    if (isHasInput) {
                        document.getElementById('imageInput')?.click();
                    }
                }}
            />
            {imageSrc && (
                <img
                    src={LP}
                    className="w-[220px] h-[220px] absolute z-0 right-[-5px] top-[10px]"
                ></img>
            )}
        </div>
    );
};

export default LPComponents;

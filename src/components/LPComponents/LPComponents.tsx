import LP from '../../../public/lp.png';
type TLPComponents = {
    imageSrc?: string;
};

const LPComponents = ({ imageSrc }: TLPComponents) => {
    return (
        <div className="relative w-full h-[250px] flex justify-center">
            <img
                src={imageSrc}
                alt="LP 사진"
                className={`w-[250px] h-[250px] object-cover cursor-pointer z-1
                                    ${
                                        imageSrc !== LP &&
                                        'absolute left-[10px] shadow-2xs'
                                    }
                                  `}
                onClick={() => document.getElementById('imageInput')?.click()}
            />
            {imageSrc !== LP && (
                <img
                    src={LP}
                    className="w-[220px] h-[220px] absolute z-0 right-[-5px] top-[10px]"
                ></img>
            )}
        </div>
    );
};

export default LPComponents;

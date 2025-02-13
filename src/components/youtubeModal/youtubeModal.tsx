import Portal from '../portal/portal';
import YouTube from 'react-youtube';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectModal } from '../../slices/modalSlice';

interface YoutubeModalProps {
    onClose: () => void;
}

const opts = {
    width: '640',
    height: '390',
    playerVars: {
        autoplay: 1,
    },
};

const opts2 = {
    width: '450',
    height: '280',
    playerVars: {
        autoplay: 1,
    },
};

const YoutubeModal = ({ onClose }: YoutubeModalProps) => {
    const { key } = useSelector(selectModal);
    const [currentOpts, setCurrentOpts] = useState(opts);
    useEffect(() => {
        const handleResize = () => {
            setCurrentOpts(window.innerWidth <= 1080 ? opts2 : opts);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    if (key == null) {
        return <></>;
    }

    return (
        <Portal>
            <div className="fixed inset-0 flex items-center justify-center z-7">
                <div
                    className="absolute inset-0 bg-black opacity-50 z-7"
                    onClick={onClose}
                ></div>
                <div className="relative z-7">
                    <YouTube videoId={key} opts={currentOpts} />
                </div>
            </div>
        </Portal>
    );
};

export default YoutubeModal;

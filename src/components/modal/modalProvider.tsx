/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import SearchBox from '../../pages/search/searchBox';
import { closeModal, selectModal } from '../../slices/modalSlice';
import YoutubeModal from '../youtubeModal/youtubeModal';

export const MODAL_TYPES = {
    YoutubeModal: 'YoutubeModal',
    SearchBoxModal: 'SearchBoxModal',
};

export const MODAL_COMPONENTS = {
    [MODAL_TYPES.SearchBoxModal]: SearchBox,
    [MODAL_TYPES.YoutubeModal]: YoutubeModal,
};

export default function ModalProvider() {
    const { modalType, isOpen } = useSelector(selectModal);
    const dispatch = useDispatch();

    const location = useLocation();
    useEffect(() => {
        dispatch(closeModal());
    }, [location, dispatch]);

    if (!isOpen) return null;

    const ModalComponent = MODAL_COMPONENTS[modalType];
    if (!ModalComponent) return null;

    return <ModalComponent onClose={() => dispatch(closeModal())} />;
}

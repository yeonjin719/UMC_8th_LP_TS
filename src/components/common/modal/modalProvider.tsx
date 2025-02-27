/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import SearchBox from '../../searchModal/searchModal';
import { closeModal, selectModal } from '../../../slices/modalSlice';
import YoutubeModal from '../../youtubeModal/youtubeModal';
import WithdrawModal from '../../withdrawModal/withdrawModal';
import AddLPModal from '../../addLPModal/addLPModal';

export const MODAL_TYPES = {
    YoutubeModal: 'YoutubeModal',
    SearchBoxModal: 'SearchBoxModal',
    WithdrawModal: 'WithdrawModal',
    AddLPModal: 'AddLPModal',
};

export const MODAL_COMPONENTS = {
    [MODAL_TYPES.SearchBoxModal]: SearchBox,
    [MODAL_TYPES.YoutubeModal]: YoutubeModal,
    [MODAL_TYPES.WithdrawModal]: WithdrawModal,
    [MODAL_TYPES.AddLPModal]: AddLPModal,
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

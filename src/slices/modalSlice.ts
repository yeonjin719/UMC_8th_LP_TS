import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IModalState {
    isOpen: boolean;
    modalType: string;
    key?: string | null;
}

const initialState: IModalState = {
    isOpen: false,
    modalType: '',
    key: '',
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (
            state,
            action: PayloadAction<string | { modalType: string; key?: string }>
        ) => {
            if (typeof action.payload === 'string') {
                state.modalType = action.payload;
            } else {
                state.modalType = action.payload.modalType;
                state.key = action.payload.key || '';
            }
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.modalType = '';
            state.isOpen = false;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state: { modal: IModalState }) => state.modal;

const modalReducer = modalSlice.reducer;
export default modalReducer;

import { configureStore } from '@reduxjs/toolkit';

import modalReducer from '../slices/modalSlice';
import searchReducer from '../slices/searchSlice';

const store = configureStore({
    reducer: {
        modal: modalReducer,
        search: searchReducer,
    },
});

export default store;

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

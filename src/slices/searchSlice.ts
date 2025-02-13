import { createSlice } from '@reduxjs/toolkit';

interface IModalState {
    isOpen: boolean;
    searchRecord: string[];
}

const initialState: IModalState = {
    isOpen: false,
    searchRecord: [],
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        addSearchRecord: (state, action) => {
            state.searchRecord.push(action.payload);
            if (state.searchRecord.length > 8) {
                state.searchRecord.shift();
            }
        },
        removeSearchRecord: (state, action) => {
            state.searchRecord = state.searchRecord.filter(
                (record) => record !== action.payload
            );
        },
        removeAllRecord: (state) => {
            state.searchRecord = [];
        },
    },
});

export const { addSearchRecord, removeSearchRecord, removeAllRecord } =
    searchSlice.actions;
export const selectSearch = (state: { search: IModalState }) => state.search;

const searchReducer = searchSlice.reducer;
export default searchReducer;

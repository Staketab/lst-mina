import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type IClientData = any;

const initialState: IClientData = {};

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        setClient: (state, action: PayloadAction<IClientData>) => {
            state.client = action.payload;
        },
    },
});

export const { setClient } = clientSlice.actions;
export default clientSlice.reducer;

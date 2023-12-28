import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadBlock } from './chainService';

export type Chain = { block: any; height: string };
export type UpdateApiKeysPayload = { projectKey?: string; projectName?: string };

const initialState: Chain = {
    block: null,
    height: null,
};

const chainSlice = createSlice({
    name: 'chain',
    initialState,
    reducers: {
        setBlock: (state, action: PayloadAction<Chain>) => {
            state.block = { ...state.block, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(loadBlock.matchFulfilled, (state, { payload }) => {
            state.height = payload.data.network.block.height;
            state.block = payload;
        });
    },
});

export const { actions, name } = chainSlice;

export default chainSlice.reducer;

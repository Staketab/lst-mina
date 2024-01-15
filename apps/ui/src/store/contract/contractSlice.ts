import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type IContractData = {
    isInitialized: boolean;
    zkApp: any;
    verificationKey: any;
};

const initialState: IContractData = {
    isInitialized: false,
    verificationKey: null,
    zkApp: null,
};

export const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
        setZkApp: (_, action: PayloadAction<IContractData>) => {
            return {
                ...action.payload,
            };
        },
    },
});

export const { setZkApp } = contractSlice.actions;
export default contractSlice.reducer;

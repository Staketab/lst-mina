import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getWalletBalance } from './walletService';

export type IWalletData = {
    accountId: string[];
    connectMessage: string;
    stakingResultMessage: {
        hash?: string;
        message?: string;
        result?: boolean;
    };
    sendResultMessage: {
        hash?: string;
        message?: string;
        result?: boolean;
    };
    walletNetwork: { chainId: string; name: string };
    balance: { balance: number; balanceUsd: number };
};

const initialState: IWalletData = {
    accountId: null,
    connectMessage: null,
    stakingResultMessage: null,
    sendResultMessage: null,
    walletNetwork: { chainId: 'testworld2', name: 'Testworld2' },
    balance: null,
};

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setWalletData: (_, action: PayloadAction<IWalletData>) => {
            return {
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(getWalletBalance.matchFulfilled, (state, { payload }) => {
            state.balance = payload;
        });
    },
});

export const { setWalletData } = walletSlice.actions;
export default walletSlice.reducer;

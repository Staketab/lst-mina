import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getWalletBalance } from './walletService';
import { PendingTransaction, UnsignedTransaction } from '@proto-kit/sequencer';

type PendingTransactions = UnsignedTransaction | PendingTransaction | undefined;

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
    pendingTransactions: PendingTransactions[];
};

const initialState: IWalletData = {
    accountId: null,
    connectMessage: null,
    stakingResultMessage: null,
    sendResultMessage: null,
    walletNetwork: { chainId: 'testworld2', name: 'Testworld2' },
    balance: { balance: 0, balanceUsd: 0 },
    pendingTransactions: [],
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
        addPendingTransaction: (state, action: PayloadAction<PendingTransactions>) => {
            state.pendingTransactions?.push(action.payload);
        },
        removePendingTransaction: (state, action: PayloadAction<PendingTransactions>) => {
            state.pendingTransactions = state.pendingTransactions.filter((tx) => {
                return tx.hash().toString() !== action.payload?.hash().toString();
            });
        },
    },
    // @ts-ignore
    extraReducers: (builder) => {
        builder.addMatcher(getWalletBalance.matchFulfilled, (state, { payload }) => {
            state.balance = payload;
        });
    },
});

export const { setWalletData, addPendingTransaction } = walletSlice.actions;
export default walletSlice.reducer;

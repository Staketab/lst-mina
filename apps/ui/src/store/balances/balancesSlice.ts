import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type IBalanceData = {
    [key: number]: string;
};

const initialState: IBalanceData = {};

export const balancesSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {
        setBalances: (_, action: PayloadAction<IBalanceData>) => {
            return {
                ...action.payload,
            };
        },
    },
});

export const { setBalances } = balancesSlice.actions;
export default balancesSlice.reducer;

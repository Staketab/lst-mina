import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getTableData } from './tableService';
import { DATA_STATUS } from '../../comman/types';

export type ITableData = {
    data?: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        content?: any[];
        data?: any[];
        totalElements: number;
        totalPages: number;
    };
    status: DATA_STATUS;
} | null;

const initialState: ITableData = {
    data: {
        content: [],
        totalElements: 0,
        totalPages: 0,
    },
    status: DATA_STATUS.INITIAL,
};

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setTableData: (_, action: PayloadAction<ITableData>) => {
            return {
                ...action.payload,
            };
        },
        setTableLoading: (state, action: PayloadAction<DATA_STATUS>) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(getTableData.matchFulfilled, (state, { payload }) => {
            state.data = payload;
            state.status = DATA_STATUS.INITIAL;
        });
        builder.addMatcher(getTableData.matchPending, (state) => {
            state.status = DATA_STATUS.LOADING;
        });
        builder.addMatcher(getTableData.matchRejected, (state) => {
            state.status = DATA_STATUS.ERROR;
        });
    },
});

export const { setTableData, setTableLoading } = tableSlice.actions;
export default tableSlice.reducer;

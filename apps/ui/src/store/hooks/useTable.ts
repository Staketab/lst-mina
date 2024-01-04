import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '..';
import * as TableStore from '../table/tableSlice';
import { ITableData } from '../table/tableSlice';
import { DATA_STATUS } from '../../comman/types';

interface IUseTable {
    table: ITableData;
    actions: {
        setTableData: (payload: ITableData) => void;
        setLoading: (payload: DATA_STATUS) => void;
    };
}

export default function useTableStore(): IUseTable {
    const dispatch = useDispatch();

    const table = useSelector<RootState, ITableData>((state) => state.table);

    const setTableData = (payload: ITableData) => dispatch(TableStore.setTableData(payload));

    const setLoading = (payload: DATA_STATUS) => dispatch(TableStore.setTableLoading(payload));

    return {
        table,
        actions: {
            setTableData,
            setLoading,
        },
    };
}

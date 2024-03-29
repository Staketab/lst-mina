import { useEffect, useMemo } from 'react';
// import Table from '../table';
import { DATA_STATUS, DataTable, ORDER_BY, SORT_BY } from '../../../comman/types';
import { useTable } from '../../../hooks';
import { ScoringConfig, testWorldConfig } from '../../../comman/config/tableConfig';
import { limitOptions } from './constants';
import { NETWORK } from '../../../comman/constants';
import { useGetTableDataQuery } from '../../../store/table/tableService';
import useTableStore from '../../../store/hooks/useTable';
import { Table } from '../../molecules/table';

type LeaderboardTablesProps = {
    activeTab: string;
};

const LeaderboardTables = ({ activeTab }: LeaderboardTablesProps): JSX.Element => {
    const { table } = useTableStore();
    const {
        page,
        limit,
        orderBy,
        sortBy,
        resetFilter,
        actions: { setPage, setLimit, setOrderBy, setSortBy },
    } = useTable({ defaultState: { limit: 100, orderBy: ORDER_BY.DESC, sortBy: SORT_BY.SCORE } });

    const urlByTab = {
        mainnet: {
            requestData: {
                url: `mainnet/api//api/scoring/?eligibleOnly=false`,
                sortBy,
                size: limit,
            },
            config: ScoringConfig,
        },
        testworld: {
            requestData: {
                url: `${NETWORK}/api//api/validators/?&searchStr=&stake=1000&epoch=3&isFullyUnlocked=true&type=active&isNotAnonymous=false&isWithFee=false&isVerifOnly=false`,
                size: limit,
                sortBy: 'amount_staked',
            },

            isTransform: true,
            config: testWorldConfig,
        },
    };

    const networkByTab = urlByTab[activeTab.toLowerCase()];
    useGetTableDataQuery({
        page,
        orderBy,
        ...networkByTab.requestData,
    });

    const tableData = useMemo(() => {
        let tableData = table.data?.data;
        if ('content' in table.data) {
            tableData = table.data?.content;
        }
        return {
            ...table.data,
            data: tableData?.map((item) => {
                const votedMIPs = item.votedHistory
                    ? `${item?.votedHistory?.filter(({ hasVoted }) => !!hasVoted)?.length || 0}/${
                          item.votedHistory.length
                      }`
                    : '-';
                return {
                    ...item,
                    votedMIPs: votedMIPs,
                    protocol: `MINA`,
                    emptyValue: null,
                };
            }),
        };
    }, [table]) as DataTable;

    useEffect(() => {
        resetFilter();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    return (
        <Table
            data={tableData}
            config={networkByTab?.config}
            isLoading={table.status === DATA_STATUS.LOADING}
            currentPage={page}
            pageLimit={limit}
            totalElements={tableData?.totalElements}
            pagesCount={tableData?.totalPages}
            limitOptions={limitOptions}
            sortBy={sortBy}
            orderBy={orderBy}
            onChangePage={(data) => {
                setPage(data);
            }}
            onChangeLimit={(data) => {
                setLimit(data);
            }}
            onChangeSort={(data) => {
                setSortBy(data);
            }}
            onChangeOrder={(data) => {
                setOrderBy(data);
            }}
        />
    );
};

export default LeaderboardTables;

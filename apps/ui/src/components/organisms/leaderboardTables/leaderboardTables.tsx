import { useEffect, useState } from 'react';
import Table from '../table';
import { DataTable, ORDER_BY, SORT_BY, TabSwitcherOptions } from '../../../comman/types';
import { useTable } from '../../../hooks';
import { ApiClient } from '../../../api/apiClient';
import { ScoringConfig, testWorldConfig } from '../../../comman/config/tableConfig';
import { limitOptions } from './constants';

const mainnetApi = new ApiClient('https://minascan.io/mainnet/api//api/scoring');
const testworldApi = new ApiClient('https://minascan.io/testworld/api//api/validators');

type LeaderboardTablesProps = {
    tabSwitcherOptions: TabSwitcherOptions;
    activeTab: string;
};

const LeaderboardTables = ({ activeTab, tabSwitcherOptions }: LeaderboardTablesProps): JSX.Element => {
    const [dataTable, setDataTable] = useState<DataTable | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const isMainnetTab = activeTab === tabSwitcherOptions[0];

    const {
        page,
        limit,
        orderBy,
        sortBy,
        resetFilter,
        actions: { setPage, setLimit, setOrderBy, setSortBy },
    } = useTable({ defaultState: { limit: 100, orderBy: ORDER_BY.DESC, sortBy: SORT_BY.SCORE } });

    const startFetchData = () => {
        setDataTable(null);
        setLoading(true);
    };

    const fetchMainnetData = async () => {
        startFetchData();
        try {
            const response: DataTable = await mainnetApi.fetchData(
                `/?eligibleOnly=false&limit=${limit}&orderBy=${orderBy}&page=${page}&sortBy=${sortBy}`
            );
            setDataTable(response);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTestworldData = async () => {
        startFetchData();
        try {
            const response: DataTable = await testworldApi.fetchData(
                `/?page=${page}&sortBy=amount_staked&orderBy=${orderBy}&searchStr=&size=${limit}&stake=1000&epoch=3&isFullyUnlocked=true&type=active&isNotAnonymous=false&isWithFee=false&isVerifOnly=false`
            );
            const content = response?.content.map((item) => {
                return {
                    pk: item.pk,
                    valName: item.name,
                    valImg: item.img,
                    stake: item.amountStaked,
                    score: '-',
                    uptimePercent: '-',
                    votedMIPs: '-',
                    winRateAvg: '-',
                };
            });

            setDataTable({ ...response, data: content });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const requestForMainnetOrTestworlData = () => {
        isMainnetTab ? fetchMainnetData() : fetchTestworldData();
    };

    useEffect(() => {
        requestForMainnetOrTestworlData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit, orderBy, page, sortBy]);

    const data = dataTable?.data?.map((item) => {
        const votedMIPs = item.votedHistory
            ? `${item?.votedHistory?.filter(({ hasVoted }) => !!hasVoted)?.length || 0}/${item.votedHistory.length}`
            : '-';
        return {
            ...item,
            votedMIPs: votedMIPs,
            protocol: `MINA`,
        };
    });

    useEffect(() => {
        resetFilter();
        requestForMainnetOrTestworlData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    return (
        <Table
            data={data}
            isLoading={loading}
            config={isMainnetTab ? ScoringConfig : testWorldConfig}
            currentPage={page}
            pageLimit={limit}
            sortBy={sortBy}
            orderBy={orderBy}
            totalElements={dataTable?.totalElements}
            pagesCount={dataTable?.totalPages}
            onPageChange={(data) => {
                setPage(data);
            }}
            onLimitChange={(data) => {
                setLimit(data);
            }}
            onOrderChange={(data) => {
                setOrderBy(data);
            }}
            onSortChange={(data) => {
                setSortBy(data);
            }}
            limitOptions={limitOptions}
        />
    );
};

export default LeaderboardTables;

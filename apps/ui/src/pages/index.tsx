import Head from 'next/head';
import { useEffect, useState } from 'react';
import { DataTable, LimitOptions, ORDER_BY, SORT_BY } from '../comman/types';
import { useTable } from '../hooks';
import Table from '../components/organisms/table';
import { ScoringConfig, testWorldConfig } from '../comman/config/tableConfig';
import styles from './index.module.css';
import { Header } from '../components/atoms/header';
import { TabSwitcher } from '../components/atoms/tabSwitcher';
import PageHeader from '../components/organisms/pageHeader/pageHeader';
import OverlayWrapper from '../components/molecules/popupOverlay/overlayWrapper';

export const limitOptions: LimitOptions = [
    { text: '50', value: 50 },
    { text: '100', value: 100 },
    { text: '200', value: 200 },
];

const tabSwitcherOptions = [
    { text: 'Mainnet', value: 'mainnet' },
    { text: 'Testworld', value: 'testworld' },
];

export default function Home() {
    const [dataTable, setDataTable] = useState<DataTable | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const {
        page,
        limit,
        orderBy,
        sortBy,
        resetFilter,
        actions: { setPage, setLimit, setOrderBy, setSortBy },
    } = useTable({ defaultState: { page: 0, limit: 100, orderBy: ORDER_BY.DESC, sortBy: SORT_BY.SCORE } });
    const [tabOptin, setTabOption] = useState(tabSwitcherOptions[0].value);
    const isFirstTab = tabOptin === tabSwitcherOptions[0].value;

    const fetchData = async () => {
        setDataTable(null);
        setLoading(true);
        try {
            const response = await fetch(
                `https://minascan.io/mainnet/api//api/scoring/?eligibleOnly=false&limit=${limit}&orderBy=${orderBy}&page=${page}&sortBy=${sortBy}`,
                {
                    method: 'GET',
                }
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDataTable(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTestworldData = async () => {
        setDataTable(null);

        setLoading(true);
        try {
            const response = await fetch(
                `https://minascan.io/testworld/api//api/validators/?page=${page}&sortBy=amount_staked&orderBy=${orderBy}&searchStr=&size=${limit}&stake=1000&epoch=3&isFullyUnlocked=true&type=active&isNotAnonymous=false&isWithFee=false&isVerifOnly=false`,
                {
                    method: 'GET',
                }
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const content = data?.content.map((item) => {
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

            setDataTable({ ...data, data: content });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        isFirstTab ? fetchData() : fetchTestworldData();

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

    const handleTabSwitcher = (value: string) => {
        setTabOption(value);
        resetFilter();
        if (value === tabSwitcherOptions[0].value) {
            fetchData();
        } else {
            fetchTestworldData();
        }
    };

    return (
        <>
            <Head>
                <title>Mina liquid staking</title>
                <meta name="description" content="built with o1js" />
                <link rel="icon" href="/assets/favicon.ico" />
            </Head>
            <div className={styles.content}>
                <OverlayWrapper />
                <PageHeader />
                <Header title="Leaderboard" />
                <TabSwitcher options={tabSwitcherOptions} onClick={handleTabSwitcher} />
                <Table
                    data={data}
                    isLoading={loading}
                    config={isFirstTab ? ScoringConfig : testWorldConfig}
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
            </div>
        </>
    );
}

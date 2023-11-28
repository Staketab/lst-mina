import Head from 'next/head';
import { useEffect, useState } from 'react';
import { DataTable, LimitOptions, ORDER_BY, SORT_BY } from '../comman/types';
import { useTable } from '../hooks';
import Table from '../components/organisms/table';
import { ScoringConfig } from '../comman/config/tableConfig';
import styles from './index.module.css';
import { Header } from '../components/atoms/header';

export const limitOptions: LimitOptions = [
    { text: '50', value: 50 },
    { text: '100', value: 100 },
    { text: '200', value: 200 },
];

export default function Home() {
    const [dataTable, setDataTable] = useState<DataTable | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const {
        page,
        limit,
        orderBy,
        sortBy,
        actions: { setPage, setLimit, setOrderBy },
    } = useTable({ defaultState: { page: 0, limit: 100, orderBy: ORDER_BY.DESC, sortBy: SORT_BY.SCORE } });

    const fetchData = async () => {
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

    useEffect(() => {
        fetchData();

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

    return (
        <>
            <Head>
                <title>Mina liquid staking</title>
                <meta name="description" content="built with o1js" />
                <link rel="icon" href="/assets/favicon.ico" />
            </Head>
            <div className={styles.content}>
                <Header title="Leaderboard" />
                <Table
                    data={data}
                    isLoading={loading}
                    config={ScoringConfig}
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
                    limitOptions={limitOptions}
                />
            </div>
        </>
    );
}

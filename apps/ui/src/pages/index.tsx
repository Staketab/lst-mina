import Head from 'next/head';
import { useEffect, useState } from 'react';
import { TabSwitcherOptions } from '../comman/types';
import { Header } from '../components/atoms/header';
import { TabSwitcher } from '../components/atoms/tabSwitcher';
import PageHeader from '../components/organisms/pageHeader/pageHeader';
import { LeaderboardTables } from '../components/organisms/leaderboardTables';
import useWallet, { isConnectedAuro } from '../store/hooks/useWallet';
import { useClient } from '../store/hooks/useClient';
import { useObserveBalance } from '../hooks/useObserveBalance';
import { useGetWalletBalanceQuery } from '../store/wallet/walletService';
import { usePollBlockHeight } from '../hooks/usePollBlockHeight';
import { POLLING_INTERVAL } from '../comman/constants';

import styles from './index.module.css';
// import { useContract } from '../store/hooks/useContract';

const tabSwitcherOptions: TabSwitcherOptions = ['Mainnet', 'Testworld'];

export default function Home(): JSX.Element {
    const [activTab, setActiveTab] = useState(tabSwitcherOptions[0]);
    const client = useClient();
    const { accountId } = useWallet();
    useGetWalletBalanceQuery(accountId?.[0], { pollingInterval: POLLING_INTERVAL });
    // useContract();
    const handleTabSwitcher = (value: string) => {
        setActiveTab(value);
    };
    const {
        actions: { initAccount },
    } = useWallet();
    useObserveBalance();
    usePollBlockHeight();

    const isStakeAvailable = activTab === tabSwitcherOptions[1];

    useEffect(() => {
        if (window.localStorage.getItem(isConnectedAuro) === 'true') {
            initAccount();
        }
        client.startClient();
    }, []);

    return (
        <>
            <Head>
                <title>Mina liquid staking</title>
                <meta name="description" content="built with o1js" />
                <link rel="icon" href="/assets/favicon.ico" />
            </Head>
            <div className={styles.content} id="main">
                <PageHeader isStakeAvailable={isStakeAvailable} />
                <Header title="Leaderboard" />
                <TabSwitcher options={tabSwitcherOptions} onClick={handleTabSwitcher} />
                <LeaderboardTables activeTab={activTab} />
            </div>
        </>
    );
}

import Head from 'next/head';
import { useState } from 'react';
import { TabSwitcherOptions } from '../comman/types';
import { Header } from '../components/atoms/header';
import { TabSwitcher } from '../components/atoms/tabSwitcher';
import PageHeader from '../components/organisms/pageHeader/pageHeader';
import { LeaderboardTables } from '../components/organisms/leaderboardTables';

import styles from './index.module.css';

const tabSwitcherOptions: TabSwitcherOptions = ['Mainnet', 'Testworld'];

export default function Home(): JSX.Element {
    const [activTab, setActiveTab] = useState(tabSwitcherOptions[0]);

    const handleTabSwitcher = (value: string) => {
        setActiveTab(value);
    };

    return (
        <>
            <Head>
                <title>Mina liquid staking</title>
                <meta name="description" content="built with o1js" />
                <link rel="icon" href="/assets/favicon.ico" />
            </Head>
            <div className={styles.content}>
                <PageHeader />
                <Header title="Leaderboard" />
                <TabSwitcher options={tabSwitcherOptions} onClick={handleTabSwitcher} />
                <LeaderboardTables activeTab={activTab} tabSwitcherOptions={tabSwitcherOptions} />
            </div>
        </>
    );
}

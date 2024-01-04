import { useEffect } from 'react';
import { useBalances } from '../store/hooks/useBalances';
import { useClient } from '../store/hooks/useClient';
import useWallet from '../store/hooks/useWallet';
import { useChain } from '../store/hooks/useChain';

export const useObserveBalance = () => {
    const client = useClient();
    const wallet = useWallet();
    const balances = useBalances();
    const {
        chain: { height },
    } = useChain();

    useEffect(() => {
        if (!client?.client || !wallet.accountId) return;

        balances.loadBalance(client.client, wallet.accountId?.[0]);
    }, [client.client, wallet.accountId, height]);
};

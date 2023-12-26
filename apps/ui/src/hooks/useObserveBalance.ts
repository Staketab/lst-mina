import { useEffect } from 'react';
import { useBalances } from '../store/hooks/useBalances';
import { useClient } from '../store/hooks/useClient';
import useWallet from '../store/hooks/useWallet';

export const useObserveBalance = () => {
    const client = useClient();
    const { accountId } = useWallet();
    const balances = useBalances();

    useEffect(() => {
        if (!client?.definition || !accountId?.[0]) return;

        balances.loadBalance(client, accountId?.[0]);
    }, [client.client, accountId?.[0]]);
};

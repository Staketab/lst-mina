import { useCallback } from 'react';
import { useClient } from '../store/hooks/useClient';
import { useBalances } from '../store/hooks/useBalances';
import useWallet from '../store/hooks/useWallet';

export const useFaucet = (amount: number) => {
    const client = useClient();
    const balances = useBalances();
    const {
        accountId,
        actions: { addPendingTransaction },
    } = useWallet();

    return useCallback(async () => {
        if (!client.client || !accountId) return;

        const pendingTransaction = await balances.faucet(client.client, accountId[0], amount);

        addPendingTransaction(pendingTransaction);
        return pendingTransaction;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client.client, accountId[0], amount]);
};

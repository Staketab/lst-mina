import { client as clientChain } from 'chain';
import * as BalancesStore from '../balances/balancesSlice';
import { useAppDispatch, RootState } from '..';
import { useSelector } from 'react-redux';
import { PublicKey, UInt64 } from 'o1js';
import { PendingTransaction, UnsignedTransaction } from '@proto-kit/sequencer';

export type Client = typeof clientChain;
export interface ClientState {
    loading: boolean;
    client?: Client;
    start: (client: Client, address: string) => Promise<void>;
}

interface IUseBalances extends BalancesStore.IBalanceData {
    setLstBalance: (value: BalancesStore.IBalanceData) => void;
    loadBalance: (client, address: string) => Promise<void>;
    faucet: (
        client: Client,
        address: string,
        amount: number
    ) => Promise<UnsignedTransaction | PendingTransaction | undefined>;
    balances: {
        [key: string]: string;
    };
}

function isPendingTransaction(transaction: UnsignedTransaction | PendingTransaction | undefined) {
    if (!transaction) throw new Error('Transaction is not a PendingTransaction');
}
export const useBalances = (): IUseBalances => {
    const dispatch = useAppDispatch();

    const setLstBalance = (payload: BalancesStore.IBalanceData) => dispatch(BalancesStore.setBalances(payload));
    const balances = useSelector<RootState, BalancesStore.IBalanceData>((state) => state.balances);

    const loadBalance = async (client, address) => {
        const balances = await client.query.runtime.Balances.balances.get(PublicKey.fromBase58(address));

        setLstBalance({
            ...balances,
            [address]: balances?.toString() ?? '0',
        });
    };

    const faucet = async (
        client: Client,
        address: string,
        amount: number
    ): Promise<UnsignedTransaction | PendingTransaction | undefined> => {
        const balances = client.runtime?.resolve('Balances');
        const sender = PublicKey.fromBase58(address);

        const tx = await client.transaction(sender, () => {
            balances.addBalance(sender, UInt64.from(amount));
        });

        await tx.sign();
        await tx.send();

        isPendingTransaction(tx.transaction);
        return tx.transaction;
    };

    return {
        loadBalance,
        setLstBalance,
        faucet,
        balances,
    };
};

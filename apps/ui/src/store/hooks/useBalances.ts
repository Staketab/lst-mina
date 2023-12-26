import { client as clientChain } from 'chain';
import * as BalancesStore from '../balances/balancesSlice';
import { useAppDispatch, RootState } from '..';
import { useSelector } from 'react-redux';
import { PublicKey } from 'o1js';

export type Client = typeof clientChain;
export interface ClientState {
    loading: boolean;
    client?: Client;
    start: (client: any, address: string) => Promise<void>;
}

interface IUseBalances extends BalancesStore.IBalanceData {
    setLstBalance: (value: BalancesStore.IBalanceData) => void;
    loadBalance: (client, address: string) => Promise<void>;
    balances: {
        [key: string]: string;
    };
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

    return {
        loadBalance,
        setLstBalance,
        balances,
    };
};

import { client as clientChain } from 'chain';
import * as ChainStore from '../chain/chainSlice';
import { RootState } from '..';
import { useSelector } from 'react-redux';

export type Client = typeof clientChain;
export interface UseChain {
    chain: ChainStore.Chain;
}

export const useChain = (): UseChain => {
    const chain = useSelector<RootState, ChainStore.Chain>((state) => state.chain);

    return { chain };
};

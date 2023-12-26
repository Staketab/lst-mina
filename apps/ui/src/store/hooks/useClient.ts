import { client as clientChain } from 'chain';
import * as ClientStore from '../client/clientSlice';
import { useAppDispatch, RootState } from '..';
import { useSelector } from 'react-redux';

export type Client = typeof clientChain;
export interface ClientState {
    loading: boolean;
    client?: Client;
    start: () => Promise<void>;
}

interface IUseClient extends ClientStore.IClientData {
    setClient: (value: ClientStore.IClientData) => void;
    startClient: () => Promise<void>;
}
export const useClient = (): IUseClient => {
    const dispatch = useAppDispatch();

    const setClient = (payload: ClientStore.IClientData) => dispatch(ClientStore.setClient(payload));
    const client = useSelector<RootState, ClientStore.IClientData>((state) => state.client);

    const startClient = async () => {
        await clientChain.start();

        setClient({ ...clientChain, query: clientChain['query'] });
    };

    return {
        ...client,
        setClient,
        startClient,
    };
};

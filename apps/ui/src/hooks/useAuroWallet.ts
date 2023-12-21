import { useContext, createContext } from 'react';

export type ResultMessage = {
    hash?: string;
    message?: string;
    result?: boolean;
};

export type WalletNetwork = {
    chainId: string;
    name: string;
};

export type WalletContextType = {
    accountId: string | null;
    connectMessage: string | null;
    stakingResultMessage: ResultMessage;
    sendResultMessage: ResultMessage;
    walletNetwork: WalletNetwork | null;
    actions: {
        onConnectClick: () => void;
        onDisconnectClick: () => void;
        onStakingClick: (to: string, memo: string, fee: number) => void;
        onSendClick: (amount: number, to: string, fee: number, memo: string) => void;
        resetConnectMessage: () => void;
        resetSendResultMessage: () => void;
        resetStakingResultMessage: () => void;
    };
};

const DEFAULT_CONTEXT: WalletContextType = {
    accountId: null,
    connectMessage: null,
    stakingResultMessage: {},
    sendResultMessage: {},
    walletNetwork: null,
    actions: {
        onConnectClick: () => console.warn('Provider not connected'),
        onStakingClick: () => console.warn('Provider not connected'),
        onSendClick: () => console.warn('Provider not connected'),
        resetConnectMessage: () => console.warn('Provider not connected'),
        resetSendResultMessage: () => console.warn('Provider not connected'),
        resetStakingResultMessage: () => console.warn('Provider not connected'),
        onDisconnectClick: () => console.warn('Disconected'),
    },
};

export const WalletContext = createContext(DEFAULT_CONTEXT);

export default function useAuroWallet() {
    return useContext(WalletContext);
}

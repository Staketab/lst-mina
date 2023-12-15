import { useContext, createContext } from 'react';

const DEFAULT_CONTEXT = {
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
    },
};

export const WalletContext = createContext(DEFAULT_CONTEXT);

export default function useAuroWallet() {
    return useContext(WalletContext);
}

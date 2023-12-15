import { useEffect, useState } from 'react';

export default function useAuroWalletCore() {
    const [accountId, setAccountId] = useState<string>(null);
    const [connectMessage, setConnectMessage] = useState<string>(null);
    const [stakingResultMessage, setStakingResultMessage] = useState<{
        hash?: string;
        message?: string;
        result?: boolean;
    }>({});
    const [sendResultMessage, setSendResultMessage] = useState<{
        hash?: string;
        message?: string;
        result?: boolean;
    }>({});
    const [walletNetwork, setWalletNetwork] = useState(null);
    const resetConnectMessage = (): void => setConnectMessage(null);
    const resetSendResultMessage = (): void => setSendResultMessage({});
    const resetStakingResultMessage = (): void => setStakingResultMessage({});

    const minaAdapter = window['mina'];

    function handleChainChange(newChain) {
        setWalletNetwork(newChain);
    }

    function handleNewAccounts(newAccounts) {
        if (Array.isArray(newAccounts)) {
            return;
        }
    }

    const initAccount = async (): Promise<void> => {
        if (minaAdapter) {
            const data = await minaAdapter.requestAccounts().catch((err) => err);
            const approveAccount = data;
            if (data.message) {
                setConnectMessage(data.message);
            } else {
                setAccountId(approveAccount);
            }
        }
    };

    const onConnectClick = async (): Promise<void> => {
        if (!minaAdapter) {
            console.warn('No provider was found Auro Wallet');
        } else {
            setConnectMessage('Onboarding in progress');
            const data = await minaAdapter.requestAccounts().catch((err) => err);
            if (data.message) {
                setConnectMessage(data.message);
            } else {
                const approveAccount = data;
                setAccountId(approveAccount);
                setConnectMessage('Connected');
            }
        }
    };
    const onDisconnectClick = async (): Promise<void> => {
        setAccountId(null);
    };

    const onStakingClick = async (to, memo, fee) => {
        const stakingResult = await minaAdapter
            .sendStakeDelegation({
                to,
                memo,
                fee,
            })
            .catch((err) => err);
        setStakingResultMessage({
            hash: stakingResult.hash,
            message: stakingResult.message,
            result: !!stakingResult.hash,
        });
    };

    const onSendClick = async (amount, to, fee, memo): Promise<void> => {
        const sendResult = await minaAdapter
            .sendPayment({
                amount,
                to,
                fee,
                memo,
            })
            .catch((err) => err);
        setSendResultMessage({
            hash: sendResult.hash,
            message: sendResult.message,
            result: !!sendResult.hash,
        });
    };

    useEffect(() => {
        setTimeout(async () => {
            if (minaAdapter) {
                minaAdapter.on('accountsChanged', handleNewAccounts);
                minaAdapter.on('chainChanged', handleChainChange);

                const data = await minaAdapter.requestNetwork().catch((err) => err);
                handleChainChange(data);
            }
        }, 200);
        if (window.localStorage.getItem('isConnectedAuro') === 'true') {
            initAccount();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minaAdapter?.requestAccounts]);

    const requestNetwork = async () => {
        const network = await minaAdapter?.requestNetwork().catch((err) => err);
        setWalletNetwork(network);
    };

    useEffect(() => {
        requestNetwork();
    }, []);

    return {
        accountId,
        connectMessage,
        stakingResultMessage,
        sendResultMessage,
        walletNetwork,
        actions: {
            onConnectClick,
            onDisconnectClick,
            onStakingClick,
            onSendClick,
            resetConnectMessage,
            resetSendResultMessage,
            resetStakingResultMessage,
        },
    };
}

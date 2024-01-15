import { useSelector } from 'react-redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState, useAppDispatch } from '..';

import * as WalletStore from '../wallet/walletSlice';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useEffect } from 'react';
import { PendingTransaction, UnsignedTransaction } from '@proto-kit/sequencer';

export type SendPaymentresponse = {
    hash?: string;
    message?: string;
    code?: number;
};

export type OnSend = (amount: number, to: string, fee: number, memo: string) => Promise<SendPaymentresponse>;

export const isConnectedAuro = 'isConnectedAuro';

interface IUseGlobal extends WalletStore.IWalletData {
    actions: {
        setWalletData: (payload: WalletStore.IWalletData) => PayloadAction<WalletStore.IWalletData>;
        onConnectWallet: () => Promise<void>;
        onDisconnectWallet: () => Promise<void>;
        onStaking: (to: string, memo: string, fee: number) => void;
        onSend: OnSend;
        handleChainChange: (value: string) => void;
        initAccount: () => Promise<void>;
        setConnectMessage: (value: string | null) => void;
        addPendingTransaction: (value: UnsignedTransaction | PendingTransaction | undefined) => void;
        setSendResultMessage: (
            value: {
                hash?: string;
                message?: string;
                result?: boolean;
            } | null
        ) => void;
    };
}

export default function useWallet(): IUseGlobal {
    const dispatch = useAppDispatch();
    const [, setIsConnectedAuro] = useLocalStorage(isConnectedAuro);

    const setWalletData = (payload: WalletStore.IWalletData) => dispatch(WalletStore.setWalletData(payload));
    const addPendingTransaction = (payload) => dispatch(WalletStore.addPendingTransaction(payload));
    // @ts-ignore
    const walletData = useSelector<RootState, WalletStore.IWalletData>((state) => state.wallet);

    const setConnectMessage = (connectMessage) => setWalletData({ ...walletData, connectMessage: connectMessage });
    const setSendResultMessage = (sendResultMessage) =>
        setWalletData({ ...walletData, sendResultMessage: sendResultMessage });

    const minaAdapter = typeof window !== 'undefined' && window['mina'];

    const handleChainChange = (newChain) => {
        setWalletData({ ...walletData, walletNetwork: newChain });
    };

    const initAccount = async (): Promise<void> => {
        if (minaAdapter) {
            const data = await minaAdapter.requestAccounts().catch((err) => err);

            if (data.message) {
                setWalletData({ ...walletData, connectMessage: data.message });
            } else {
                setWalletData({ ...walletData, accountId: data });
            }
        }
    };
    const onConnectWallet = async (): Promise<void> => {
        if (!minaAdapter) {
            console.warn('No provider was found Auro Wallet');
        } else {
            setWalletData({ ...walletData, connectMessage: 'Onboarding in progress' });

            const data = await minaAdapter.requestAccounts().catch((err) => err);
            if (data.message) {
                setWalletData({ ...walletData, connectMessage: data.message });
            } else {
                setWalletData({ ...walletData, accountId: data, connectMessage: 'Connected' });
                setIsConnectedAuro(true);
            }
        }
    };

    const onDisconnectWallet = async (): Promise<void> => {
        setWalletData(null);
        setIsConnectedAuro(false);
    };

    const onStaking = async (to: string, memo: string, fee: number) => {
        const stakingResult = await minaAdapter
            .sendStakeDelegation({
                to,
                memo,
                fee,
            })
            .catch((err) => err);
        setWalletData({
            ...walletData,
            stakingResultMessage: {
                hash: stakingResult.hash,
                message: stakingResult.message,
                result: !!stakingResult.hash,
            },
        });
    };

    const onSend = async (amount: number, to: string, fee: number, memo: string): Promise<SendPaymentresponse> => {
        const sendResult = await minaAdapter
            .sendPayment({
                amount,
                to,
                fee,
                memo,
            })
            .catch((err) => err);

        setWalletData({
            ...walletData,
            sendResultMessage: {
                hash: sendResult.hash,
                message: sendResult.message,
                result: !!sendResult.hash,
            },
        });
        return sendResult;
    };

    const requestNetwork = async () => {
        const network = await minaAdapter?.requestNetwork().catch((err) => err);
        setWalletData({
            ...walletData,
            walletNetwork: network,
        });
    };

    useEffect(() => {
        requestNetwork();
    }, []);

    useEffect(() => {
        setTimeout(async () => {
            if (minaAdapter && walletData.accountId) {
                minaAdapter.on('chainChanged', handleChainChange);

                const data = await minaAdapter.requestNetwork().catch((err) => err);
                handleChainChange(data);
            }
        }, 200);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minaAdapter?.requestNetwork]);

    return {
        ...walletData,
        actions: {
            setWalletData,
            onConnectWallet,
            onDisconnectWallet,
            onStaking,
            onSend,
            handleChainChange,
            initAccount,
            setConnectMessage,
            setSendResultMessage,
            addPendingTransaction,
        },
    };
}

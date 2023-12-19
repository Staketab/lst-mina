import React from 'react';
import useAuroWallet from '../../../hooks/useAuroWallet';
import useAddressBalance from '../../../hooks/useAddressBalance';
import WalletOperationsPopup from '../walletOperationsPopup';

const SendComponent = ({ open, setShowPopup, recipient }) => {
    const {
        accountId,
        sendResultMessage,
        actions: { onSendClick, resetSendResultMessage },
    } = useAuroWallet();
    const { balance } = useAddressBalance(accountId?.[0] ?? null);

    const closeHandler = () => {
        resetSendResultMessage();
        setShowPopup(false);
    };

    const isSelf = recipient === accountId?.[0];

    return (
        <WalletOperationsPopup
            onClose={closeHandler}
            selectedAddress={isSelf ? null : recipient}
            failureReason={sendResultMessage.message}
            avaliableAmount={balance !== null && balance !== undefined ? +balance : null}
            currency="MINA"
            actionHandler={({ address, amount, memo, fee }) => onSendClick(amount, address, fee, memo)}
            result={sendResultMessage.result ?? null}
            minAmount={0.000000001}
            minFee={0.001}
            txHash={sendResultMessage.hash}
            redirect="account"
            needMemo
            open={open}
            zIndex={53}
        />
    );
};

export default SendComponent;

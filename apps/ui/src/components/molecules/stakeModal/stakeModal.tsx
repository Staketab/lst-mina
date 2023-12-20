import React from 'react';
import useAuroWallet from '../../../hooks/useAuroWallet';
import useAddressBalance from '../../../hooks/useAddressBalance';
import { useMedia } from '../../../hooks';
import PopupOverlay from '../popupOverlay';
import StakeContent from './stakeContent';
import { ModalWrapper } from '../../atoms/modalWrapper';

export type StakeParams = {
    address: string;
    amount: number;
    fee: number;
    memo: string;
};

const StakeModal = ({
    open,
    setShowPopup,
}: {
    open?: boolean;
    setShowPopup: (value: boolean) => void;
}): JSX.Element => {
    const {
        accountId,
        actions: { onSendClick, resetSendResultMessage },
    } = useAuroWallet();
    const { balance } = useAddressBalance(accountId?.[0] ?? null);

    const onCloseModul = () => {
        resetSendResultMessage();
        setShowPopup(false);
    };
    const {
        greater: { xs: xsScreen },
    } = useMedia();

    const onStake = ({ address, amount, memo, fee }: StakeParams): void => onSendClick(amount, address, fee, memo);

    return (
        <PopupOverlay position={xsScreen ? 'center' : 'bottom'} animation="appear" onClose={onCloseModul} show={open}>
            <ModalWrapper>
                <StakeContent
                    onClose={onCloseModul}
                    avaliableAmount={(balance !== null && balance !== undefined && Number(balance)) || 0}
                    onStake={onStake}
                    minAmount={0.000000001}
                />
            </ModalWrapper>
        </PopupOverlay>
    );
};

export default StakeModal;

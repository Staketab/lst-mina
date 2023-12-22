import React, { useEffect, useMemo, useState } from 'react';
import useAddressBalance from '../../../hooks/useAddressBalance';
import { useMedia } from '../../../hooks';
import PopupOverlay from '../popupOverlay';
import StakeContent from './stakeContent/stakeContent';
import { ModalWrapper } from '../../atoms/modalWrapper';
import ConfirmContent from './stakeContent/confirmContent';
import SuccessContent from './stakeContent/successContent';
import { defaultWallet } from '../../../comman/constants';
import useAuroWalletCore from '../../../hooks/useAuroWalletCore';
import { SendPaymentresponse } from '../../../hooks/useAuroWallet';
import FaieldContent from './stakeContent/faieldContent';

export type StakeParams = {
    address: string;
    amount: number;
    fee: number;
    memo: string;
};

export interface ModalsController {
    set: (m: ModalsTypes) => void;
    push: (m: ModalsTypes) => void;
    close: () => void;
}
export enum ModalsTypes {
    CONFIRM = 'CONFIRM',
    SECCUSS = 'SECCUSS',
    STAKE = 'STAKE',
    FAILED = 'failed',
}

const StakeModal = ({
    open,
    setShowPopup,
}: {
    open?: boolean;
    setShowPopup: (value: boolean) => void;
}): JSX.Element => {
    const [openedModals, setOpenedModals] = useState<ModalsTypes[]>([]);
    const [stakePayload, setStakePayload] = useState<{ amount: number; fee: number }>(null);

    const {
        accountId,
        sendResultMessage,
        actions: { onSendClick, resetSendResultMessage },
    } = useAuroWalletCore();
    const { balance } = useAddressBalance(accountId?.[0] ?? null);
    console.log(useAuroWalletCore());
    console.log(sendResultMessage);

    const {
        greater: { xs: xsScreen },
    } = useMedia();

    const onStake = async (): Promise<SendPaymentresponse | void> => {
        return await onSendClick(stakePayload?.amount, defaultWallet, stakePayload?.fee, 'stake');
    };

    const modalsController = useMemo(
        () => ({
            push: (modal: ModalsTypes) => {
                setOpenedModals([...openedModals, modal]);
            },
            set: (modal: ModalsTypes) => {
                if (!modal) {
                    setOpenedModals([]);
                } else {
                    setOpenedModals([modal]);
                }
            },
            close: () => {
                resetSendResultMessage();
                setShowPopup(false);
                setOpenedModals([]);
            },
        }),
        [openedModals]
    );

    useEffect(() => {
        if (open) {
            modalsController.set(ModalsTypes.STAKE);
        }
    }, [open]);

    return (
        <PopupOverlay
            position={xsScreen ? 'center' : 'bottom'}
            animation="appear"
            onClose={() => modalsController.close()}
            show={!!openedModals.length}
        >
            <ModalWrapper>
                {openedModals.map((m) => {
                    const commanProps = { modalsController };
                    switch (m) {
                        case ModalsTypes.STAKE:
                            return (
                                <StakeContent
                                    balance={balance ? balance : 0}
                                    setStakePayload={setStakePayload}
                                    {...commanProps}
                                />
                            );
                        case ModalsTypes.CONFIRM:
                            return <ConfirmContent {...commanProps} onStake={onStake} />;
                        case ModalsTypes.SECCUSS:
                            return <SuccessContent {...commanProps} />;
                        case ModalsTypes.FAILED:
                            return <FaieldContent {...commanProps} message={sendResultMessage?.message} />;
                    }
                })}
            </ModalWrapper>
        </PopupOverlay>
    );
};

export default StakeModal;

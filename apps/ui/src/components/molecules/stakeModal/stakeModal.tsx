import React, { useEffect, useMemo, useState } from 'react';
import useAuroWallet from '../../../hooks/useAuroWallet';
import useAddressBalance from '../../../hooks/useAddressBalance';
import { useMedia } from '../../../hooks';
import PopupOverlay from '../popupOverlay';
import StakeContent from './stakeContent/stakeContent';
import { ModalWrapper } from '../../atoms/modalWrapper';
import ConfirmContent from './stakeContent/confirmContent';
import SuccessContent from './stakeContent/successContent';
import { defaultWallet } from '../../../comman/constants';

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
        actions: { onSendClick, resetSendResultMessage },
    } = useAuroWallet();
    const { balance } = useAddressBalance(accountId?.[0] ?? null);

    const {
        greater: { xs: xsScreen },
    } = useMedia();

    const onStake = (): void => {
        onSendClick(stakePayload?.amount, defaultWallet, stakePayload?.fee, 'stake');
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
                                    avaliableAmount={
                                        (balance !== null && balance !== undefined && Number(balance)) || 0
                                    }
                                    minAmount={0.000000001}
                                    setStakePayload={setStakePayload}
                                    {...commanProps}
                                />
                            );
                        case ModalsTypes.CONFIRM:
                            return <ConfirmContent {...commanProps} onStake={onStake} />;
                        case ModalsTypes.SECCUSS:
                            return <SuccessContent {...commanProps} />;
                    }
                })}
            </ModalWrapper>
        </PopupOverlay>
    );
};

export default StakeModal;

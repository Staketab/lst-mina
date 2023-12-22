import React, { useEffect, useMemo, useState } from 'react';
import useAddressBalance from '../../../hooks/useAddressBalance';
import StakeModal from './modals/stakeModal';
import SuccessModal from './modals/successModal';
import useAuroWalletCore from '../../../hooks/useAuroWalletCore';
import FaieldModal from './modals/faieldModal';

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
    SECCUSS = 'SECCUSS',
    STAKE = 'STAKE',
    FAILED = 'failed',
}

const StakeModalController = ({ open, closeModal }: { open?: boolean; closeModal: () => void }): JSX.Element => {
    const [openedModals, setOpenedModals] = useState<ModalsTypes[]>([]);

    const {
        accountId,
        sendResultMessage,
        actions: { onSendClick, resetSendResultMessage },
    } = useAuroWalletCore();
    const { balance } = useAddressBalance(accountId?.[0] ?? null);

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
                setOpenedModals([]);
                closeModal();
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
        <>
            {openedModals.map((m) => {
                const commanProps = { modalsController, open: true, key: m, openedModals: openedModals };
                switch (m) {
                    case ModalsTypes.STAKE:
                        return <StakeModal balance={balance ? balance : 0} onStake={onSendClick} {...commanProps} />;
                    case ModalsTypes.SECCUSS:
                        return <SuccessModal {...commanProps} />;
                    case ModalsTypes.FAILED:
                        return <FaieldModal {...commanProps} message={sendResultMessage?.message} />;
                }
            })}
        </>
    );
};

export default StakeModalController;

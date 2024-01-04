import React, { useEffect, useMemo, useState } from 'react';
import StakeModal from './modals/stakeModal';
import SuccessModal from './modals/successModal';
import FaieldModal from './modals/faieldModal';
import useWallet, { OnSend } from '../../../store/hooks/useWallet';

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
    const [stakeAmount, setStakeAmount] = useState<number>(null);

    const {
        sendResultMessage,
        balance,
        actions: { onSend, setSendResultMessage },
    } = useWallet();

    const handleStake: OnSend = async (amount, defaultWallet, fee, memo) => {
        let response;
        try {
            response = await onSend(amount, defaultWallet, fee, memo);
            setStakeAmount(amount);
        } catch (error) {
            console.error(error);
        }
        return response;
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
                setSendResultMessage({});
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
                        return (
                            <StakeModal
                                balance={balance ? balance.balance : 0}
                                onStake={handleStake}
                                {...commanProps}
                            />
                        );
                    case ModalsTypes.SECCUSS:
                        return <SuccessModal {...commanProps} stakeAmount={stakeAmount} />;
                    case ModalsTypes.FAILED:
                        return <FaieldModal {...commanProps} message={sendResultMessage?.message} />;
                }
            })}
        </>
    );
};

export default StakeModalController;

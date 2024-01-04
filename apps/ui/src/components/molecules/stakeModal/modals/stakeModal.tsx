import React, { useState } from 'react';
import style from '../index.module.css';
import classNames from 'classnames';
import { useKeyPress } from '../../../../hooks/useKeyPress';
import backIcon from '../img/Back.svg';

import { Input } from '../../../atoms/input';
import { Variant } from '../../../atoms/button/types';
import { Button } from '../../../atoms/button';
import { formatNum } from '../../../../comman/helpers';
import { ModalsController, ModalsTypes } from '../StakeModalController';
import { AlertMessage, VariantsAlertMessage } from '../../../atoms/alertMessage';
import { NETWORK, defaultWallet } from '../../../../comman/constants';
import useWallet, { OnSend } from '../../../../store/hooks/useWallet';
import StakeModalsWrapper from '../../stakeModalsWrapper/stakeModalsWrapper';

type StakeContentProps = {
    modalsController: ModalsController;
    balance: number;
    openedModals: ModalsTypes[];
    onStake: OnSend;
};

type Fee = {
    value: number;
    title: string;
    isDefault?: boolean;
};

export const defaultFees: Fee[] = [
    { value: 0.0011, title: 'slow' },
    { value: 0.0101, title: 'default', isDefault: true },
    { value: 0.2001, title: 'fast' },
];

const StakeModal = ({ modalsController, onStake, balance, openedModals }: StakeContentProps): JSX.Element => {
    const { walletNetwork } = useWallet();

    const defaultFee = defaultFees.find(({ isDefault }) => isDefault);
    const minAmount = 0.000000001;

    const [amount, setAmount] = useState<number>(null);
    const [fee, setFee] = useState<number>(defaultFee.value);

    const onChangeAmount = ({ target }): void => {
        const { value } = target;
        setAmount(value ? Number(value) : null);
    };

    const onNext = () => {
        onStake(amount, defaultWallet, fee, 'stake')
            .then((data) => {
                if ('hash' in data) {
                    modalsController.set(ModalsTypes.SECCUSS);
                } else {
                    modalsController.set(ModalsTypes.FAILED);
                }
            })
            .catch(() => modalsController.set(ModalsTypes.FAILED));
    };

    const insufficientFundError = amount > balance && 'Insufficient Funds';
    const lowerThanMinimumError = amount < minAmount && !!amount && 'Lower than minimum';
    const amountError = insufficientFundError || lowerThanMinimumError;
    const isShowAlert = walletNetwork?.chainId.slice(0, -1) !== NETWORK;

    useKeyPress('Escape', modalsController.close);

    return (
        <StakeModalsWrapper
            openedModals={openedModals}
            modalsController={modalsController}
            title="Stake Mina"
            backIcon={backIcon}
        >
            <div className={style.walletOperationsPopup}>
                {isShowAlert && (
                    <AlertMessage
                        variant={VariantsAlertMessage.WARNING}
                        text={`The active network on your wallet does not match the active network in the explorer. Switch the network to ${NETWORK} to proceed`}
                        className={style.alertMessage}
                    />
                )}
                <Input
                    placeholder="Enter the amount"
                    value={amount ?? ''}
                    type="number"
                    className={style.input}
                    onChange={onChangeAmount}
                />
                {amountError && <p className={classNames(style.errorText, 't-inter-medium')}>{amountError}</p>}
                <div className={classNames(style.avaliableAmount, 't-inter-semi-bold')}>
                    Avaliable: {formatNum(balance, 9)} Mina
                </div>
                <div className={style.feeWrapper}>
                    <div className={'t-inter-medium'}>Fee</div>
                    <div className={'t-inter-semi-bold'}>{formatNum(fee, 9) || defaultFee.value}</div>
                </div>
                <div className={style.feeBlock}>
                    {defaultFees.map(({ value, title, isDefault }) => {
                        const selectedButtonVariant = fee === value ? Variant.blue : Variant.grey;
                        const buttonVariant = isDefault && fee === 0 ? Variant.blue : selectedButtonVariant;
                        return (
                            <Button key={value} text={title} onClick={() => setFee(value)} variant={buttonVariant} />
                        );
                    })}
                </div>

                <div className={style.buttonsBlock}>
                    <Button text="Cancel" onClick={() => modalsController.close()} variant={Variant.cancel} />
                    <Button text="Next" onClick={onNext} variant={Variant.blue} />
                </div>
            </div>
        </StakeModalsWrapper>
    );
};

export default StakeModal;

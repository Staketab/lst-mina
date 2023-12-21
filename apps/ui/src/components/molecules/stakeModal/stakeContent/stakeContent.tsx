import React, { useState } from 'react';
import style from '../index.module.css';
import classNames from 'classnames';
import { useKeyPress } from '../../../../hooks/useKeyPress';
import { Input } from '../../../atoms/input';
import { Variant } from '../../../atoms/button/types';
import { Button } from '../../../atoms/button';
import { formatNum } from '../../../../comman/helpers';
import { ModalsController, ModalsTypes } from '../stakeModal';
import backIcon from '../img/Back.svg';
import Image from 'next/image';
import { AlertMessage, VariantsAlertMessage } from '../../../atoms/alertMessage';
import { NETWORK } from '../../../../comman/constants';
import useAuroWalletCore from '../../../../hooks/useAuroWalletCore';

type StakeContentProps = {
    avaliableAmount: number;
    minAmount: number;
    modalsController: ModalsController;
    setStakePayload: (value: { amount: number; fee: number }) => void;
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

const StakeContent = ({
    avaliableAmount,
    minAmount,
    modalsController,
    setStakePayload,
}: StakeContentProps): JSX.Element => {
    const { walletNetwork } = useAuroWalletCore();

    const defaultFee = defaultFees.find(({ isDefault }) => isDefault);

    const [amount, setAmount] = useState<number>(null);
    const [fee, setFee] = useState<number>(defaultFee.value);

    const onChangeAmount = ({ target }): void => {
        const { value } = target;
        setAmount(value ? Number(value) : null);
    };

    const onNext = (): void => {
        setStakePayload({
            amount: amount,
            fee: fee,
        });
        modalsController.set(ModalsTypes.CONFIRM);
    };

    const insufficientFundError = amount > avaliableAmount && 'Insufficient Funds';
    const lowerThanMinimumError = amount < minAmount && !!amount && 'Lower than minimum';
    const amountError = insufficientFundError || lowerThanMinimumError;
    const isShowAlert = walletNetwork?.chainId.slice(0, -1) !== NETWORK;

    useKeyPress('Escape', modalsController.close);

    return (
        <div className={style.walletOperationsPopup}>
            <Image src={backIcon} alt="" className={style.backIcon} onClick={() => modalsController.close()} />
            <p className={classNames(style.stakeContentHeader, 't-inter-semi-bold')}>Stake Mina</p>
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
            {typeof avaliableAmount === 'number' && (
                <div className={classNames(style.avaliableAmount, 't-inter-semi-bold')}>
                    Avaliable: {formatNum(avaliableAmount, 9)} Mina
                </div>
            )}
            <div className={style.feeWrapper}>
                <div className={'t-inter-medium'}>Fee</div>
                <div className={'t-inter-semi-bold'}>{formatNum(fee, 9) || defaultFee.value}</div>
            </div>
            <div className={style.feeBlock}>
                {defaultFees.map(({ value, title, isDefault }) => {
                    const selectedButtonVariant = fee === value ? Variant.blue : Variant.grey;
                    const buttonVariant = isDefault && fee === 0 ? Variant.blue : selectedButtonVariant;
                    return <Button key={value} text={title} onClick={() => setFee(value)} variant={buttonVariant} />;
                })}
            </div>

            <div className={style.buttonsBlock}>
                <Button text="Cancel" onClick={() => modalsController.close()} variant={Variant.cancel} />
                <Button text="Next" onClick={onNext} variant={Variant.blue} disabled={!!amountError || !amount} />
            </div>
        </div>
    );
};

export default StakeContent;

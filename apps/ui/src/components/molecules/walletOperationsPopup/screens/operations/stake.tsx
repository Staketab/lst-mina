import React, { useEffect, useState } from 'react';
import style from '../../WalletOperationsPopup.module.css';
import Back from '../../img/Back.svg';
import WalletOperationsPopupControls from '../../controls';
import { defaultFees } from '../..';
import CustomFeePlate from '../screenComponents/customFeePlate';
import Image from 'next/image';
import { formatNum } from '../../../../../comman/helpers';
import { Input } from '../../../../atoms/input';

const OperationsStake = ({
    needAmount,
    setTxFee,
    minFee,
    setOperationAmount,
    txFee,
    avaliableAmount,
    operationAmount = 0,
    onReturn,
    onClose,
    onNext,
    currency,
    minAmount,
    networksNotMatch,
    action,
    isCustomFee,
    isFullAvaliableAmount,
    customFeeOptions = defaultFees,
}) => {
    const [amount, setAmount] = useState(0);

    const [customFee, setCustomFee] = useState(txFee);
    const [customFeeInput, setCustomFeeInput] = useState(
        Object.values(customFeeOptions).includes(txFee) ? '' : String(txFee)
    );

    useEffect(() => {
        setAmount(operationAmount ?? 0);
    }, [operationAmount]);

    useEffect(() => {
        setCustomFee(txFee);
    }, [txFee]);

    const feeHandler = (val, isCustom) => {
        !isCustom && setCustomFeeInput('');
        setCustomFee(val);
        setTxFee(val);
    };

    const amountChangeHandler = (e) => {
        setAmount(e.target.value);
        setOperationAmount(e.target.value);
    };

    const insufficientFundError = amount > avaliableAmount && 'Insufficient Funds';
    const lowerThanMinimumError = amount < minAmount && amount !== null && amount !== 0 && 'Lower than minimum';
    const amountError = insufficientFundError || lowerThanMinimumError;

    const feeError =
        +customFeeInput < minFee && customFeeInput !== null && customFeeInput !== '' ? 'Lower than minimum' : null;

    const nextDisabled =
        networksNotMatch ||
        (needAmount && !isFullAvaliableAmount && (amount > avaliableAmount || Number(amount) < minAmount)) ||
        (isCustomFee && feeError);

    return (
        <div className={style.stake}>
            <p className={style.title}>
                {action} {currency}
            </p>
            {onReturn && (
                <div className={style.backIcon} onClick={onReturn}>
                    <Image src={Back} alt="" />
                </div>
            )}
            <div className={style.inputTitle}>Amount</div>
            <Input
                placeholder={
                    isFullAvaliableAmount
                        ? formatNum(avaliableAmount, 9) + ' ' + currency
                        : `Enter ${currency} amount (min ${formatNum(minAmount, 9)})`
                }
                disabled={isFullAvaliableAmount}
                value={isFullAvaliableAmount ? '' : amount || ''}
                type="number"
                className={style.input}
                onChange={amountChangeHandler}
            />
            {amountError && <p className={style.errorText}>{amountError}</p>}
            {avaliableAmount !== null && avaliableAmount !== undefined && (
                <div className={style.avaliable}>
                    Avaliable: {formatNum(avaliableAmount, 9)} {currency}
                </div>
            )}
            <div className={style.feePlate}>
                <CustomFeePlate changeHandler={feeHandler} options={customFeeOptions} customfee={customFee} />
            </div>

            <WalletOperationsPopupControls onNext={onNext} onCancel={onClose} nextDisabled={nextDisabled} />
        </div>
    );
};

export default OperationsStake;

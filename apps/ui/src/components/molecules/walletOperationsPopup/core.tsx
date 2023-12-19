import React, { useEffect, useState } from 'react';
import style from './WalletOperationsPopup.module.css';
import { defaultPopupConfig } from './defaultConfig';
import WalletOperationsPopupOperation from './screens/operation';

import { round } from 'lodash';
import { walletActions, defaultFees } from './index';
import { useKeyPress } from '../../../hooks/useKeyPress';

const WalletOperationsPopupCore = ({
    redirect = 'validator',
    action = walletActions.stake,
    needMemo,
    needNonce,
    selectedAddress = '',
    list,
    estimatedFee,
    recalculateFee,
    getEstimatedFeeByValue,
    avaliableAmount,
    currency = '',

    onClose = () => {},

    minAmount = 0.000000001,
    minFee = 0.000000001,
    needAmount = true,
    networksNotMatch = false,
    isFullAvaliableAmount = false,
    disableList = false,
    isLoading = false,

    isCustomFee,
    validateAddressInput,
    maxPrecision = 9,
    popupConfig = defaultPopupConfig,

    customFeeOptions = defaultFees,
}) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [operationAmount, setOperationAmount] = useState(null);
    useKeyPress('Escape', onClose);

    const [txFee, setTxFee] = useState(estimatedFee ?? null);
    const [grossAvaliableAmount, setGrossAvaliableAmount] = useState(
        Math.max(
            0,
            avaliableAmount -
                (getEstimatedFeeByValue ? getEstimatedFeeByValue(avaliableAmount, selectedItem?.address) : txFee)
        )
    );

    useEffect(() => {
        if (!getEstimatedFeeByValue) setGrossAvaliableAmount(round(Math.max(0, avaliableAmount - txFee), maxPrecision));
    }, [txFee]);

    useEffect(() => {
        if (!isCustomFee) setTxFee(estimatedFee);
    }, [estimatedFee]);

    useEffect(() => {
        if (!isLoading && selectedAddress) {
            setSelectedItem(
                list && list.length > 0
                    ? list.find((el) => el.address === selectedAddress)
                    : { address: selectedAddress }
            );
        } else if (!selectedAddress) {
            setSelectedItem(null);
        }
    }, [selectedAddress, isLoading]);

    useEffect(() => {
        recalculateFee && recalculateFee(operationAmount ?? avaliableAmount, selectedItem?.address);
        if (!isCustomFee && getEstimatedFeeByValue)
            setTxFee(getEstimatedFeeByValue(operationAmount, selectedItem?.address));
    }, [operationAmount, selectedItem]);

    useEffect(() => {
        if (isFullAvaliableAmount) setOperationAmount(grossAvaliableAmount);
    }, [grossAvaliableAmount]);

    return (
        <div className={style.walletOperationsPopup}>
            <WalletOperationsPopupOperation
                selectedItem={selectedItem}
                avaliableAmount={grossAvaliableAmount}
                operationAmount={operationAmount}
                currency={currency}
                needMemo={needMemo}
                needAmount={needAmount}
                onReturn={
                    !disableList
                        ? () => {
                              setSelectedItem(null);
                              setOperationAmount(0);
                          }
                        : null
                }
                onClose={onClose}
                minAmount={minAmount}
                minFee={minFee}
                networksNotMatch={networksNotMatch}
                action={action}
                redirect={redirect}
                needNonce={needNonce}
                setTxFee={setTxFee}
                txFee={txFee}
                isCustomFee={isCustomFee}
                setOperationAmount={setOperationAmount}
                setSelectedItem={setSelectedItem}
                validateAddressInput={validateAddressInput}
                maxPrecision={maxPrecision}
                popupConfig={popupConfig}
                isFullAvaliableAmount={isFullAvaliableAmount}
                customFeeOptions={customFeeOptions}
            />
        </div>
    );
};

export default WalletOperationsPopupCore;

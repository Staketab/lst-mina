import React, { useState, useEffect } from 'react';
import style from '../../WalletOperationsPopup.module.css';
import { formatNum } from '../../../../../comman/helpers';
import { Button } from '../../../../atoms/button';
import { Variant } from '../../../../atoms/button/types';
import classNames from 'classnames';

const CustomFeePlate = ({ changeHandler, options, customfee }) => {
    const [value, setValue] = useState(customfee);

    useEffect(() => {
        setValue(customfee);
    }, [customfee]);

    const handleFee = (val) => {
        changeHandler(val);
        setValue(val);
    };

    return (
        <div className={style.customFeePlate}>
            <div className={style.customFeePlateHeader}>
                <div className={classNames(style.subtitle, 't-inter-medium')}>Fee</div>
                <div className={classNames(style.customFeePlateHeaderValue, 't-inter-semi-bold')}>
                    {formatNum(value, 9)}
                </div>
            </div>
            <div className={style.customFeePlateList}>
                {Object.keys(options).map((el) => (
                    <div className={style.customFeePlateBtn} key={el}>
                        <Button
                            text={el}
                            onClick={() => handleFee(options[el])}
                            variant={value === options[el] ? Variant.blue : Variant.grey}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomFeePlate;

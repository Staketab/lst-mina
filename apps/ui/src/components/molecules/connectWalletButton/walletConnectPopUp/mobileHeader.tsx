import React from 'react';
import style from './WalletConnectPopUp.module.css';
import CloseIcon from './img/CloseIcon.svg';
import Image from 'next/image';
import { Logo } from '../../../atoms/logo';

const WalletConnectPopUpMobileHeader = ({ onClose, message, action }) => {
    return (
        <div className={style.mobileHeader}>
            <div className={style.closeBtn} onClick={onClose}>
                <Image src={CloseIcon} alt="" />
                <CloseIcon />
            </div>
            <Logo className={style.logo} />
            <div className={style.heading}>
                <p className={style.title}>{action}</p>
                <p className={style.message}>{message}</p>
            </div>
        </div>
    );
};

export default WalletConnectPopUpMobileHeader;

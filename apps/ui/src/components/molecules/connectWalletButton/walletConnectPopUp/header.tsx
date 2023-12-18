import React from 'react';
import style from './WalletConnectPopUp.module.css';
import headerBG from './img/headerBG.png';
import CloseIcon from './img/CloseIcon.svg';
import WalletConnectPopUpProgress from './stepProgress';
import Image from 'next/image';
import classNames from 'classnames';
import { Logo } from '../../../atoms/logo';

const WalletConnectPopUpHeader = ({ step, onClose, message, action, isMobile }) => {
    return (
        <div className={style.header} style={{ backgroundImage: `url(${headerBG})` }}>
            {!isMobile && (
                <div className={style.heading}>
                    <Logo />
                    <div className={style.closeBtn} onClick={onClose}>
                        <Image src={CloseIcon} alt="" />
                    </div>
                </div>
            )}
            <p className={classNames(style.title, 't-inter-semi-bold')}>{action}</p>
            <div className={style.progressContainer}>
                <WalletConnectPopUpProgress step={step} />
            </div>
            <p className={classNames(style.message, 't-inter-medium')}>{message}</p>
        </div>
    );
};

export default WalletConnectPopUpHeader;

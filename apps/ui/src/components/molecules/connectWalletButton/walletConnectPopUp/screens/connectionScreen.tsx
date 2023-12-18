import React from 'react';
import style from './Screens.module.css';
import { Button } from '../../../../atoms/button';
import classNames from 'classnames';
import Image from 'next/image';
import { Logo } from '../../../../atoms/logo';
import { Loader } from '../../../../atoms/loader';

const ConnectingScreen = ({ onReturn, walletName, walletImg }) => {
    return (
        <div className={style.connectingScreen}>
            <p className={classNames(style.screenTitle, 't-inter-semi-bold')}>Mina Wallet</p>
            <div className={style.loadingWrapper}>
                <div className={style.loadingWrapperIcon}>
                    <Logo />
                </div>
                <div className={style.failIcon}>
                    <Loader />
                </div>
                <div className={style.loadingWrapperIcon}>
                    <Image src={walletImg} alt="" />
                </div>
            </div>
            <p className={classNames(style.connectingScreenSubtitle, 't-inter-bold')}>
                Opening {walletName ?? 'wallet'}...
            </p>
            <p className={classNames(style.connectingScreenText, 't-inter-medium')}>
                Confirm connection in the extension.
            </p>
            <Button text="Back to wallets" onClick={onReturn} className={style.connectingScreenButton} />
            <p className={classNames(style.connectingScreenHelp, 't-inter-semi-bold')}>
                No pop-up? Check if your {walletName ?? 'wallet'} extension is unlocked.
            </p>
        </div>
    );
};

export default ConnectingScreen;

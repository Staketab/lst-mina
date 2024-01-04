import React from 'react';
import style from './Screens.module.css';
import { Button } from '../../../../atoms/button';
import classNames from 'classnames';
import { Logo } from '../../../../atoms/logo';

const InstallScreen = ({ onReturn, walletName = 'wallet', downloadUrl, downloadUrlMobile, isMobileConnection }) => {
    return (
        <div className={style.installScreen}>
            {!isMobileConnection || downloadUrlMobile ? (
                <>
                    <p className={classNames(style.screenTitle, 't-inter-semi-bold')}>Mima Wallet</p>
                    <Logo />
                    <p className={style.installScreenSubtitle}>
                        <span>{walletName}</span> is not installed
                    </p>
                    <p className={style.installScreenText}>
                        The {walletName} extension is not installed in your browser
                    </p>
                    <Button
                        text="Install"
                        className={style.installScreenButton}
                        onClick={() =>
                            window.open(isMobileConnection ? downloadUrlMobile : downloadUrl, '_blank', 'noreferrer')
                        }
                    />
                </>
            ) : (
                <p className={style.installScreenText}>
                    To connect with this wallet please connect on a Desktop with the{' '}
                    {
                        <a href={isMobileConnection ? downloadUrlMobile : downloadUrl} target="_blank" rel="noreferrer">
                            {walletName}
                        </a>
                    }{' '}
                    browser extension.
                </p>
            )}
            {!isMobileConnection ? (
                <p className={style.installScreenBack} onClick={onReturn}>
                    Back to wallets
                </p>
            ) : (
                <Button text="Back to wallets" className={style.installScreenButton} onClick={onReturn} />
            )}
        </div>
    );
};

export default InstallScreen;

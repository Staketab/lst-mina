import React, { useEffect } from 'react';
import style from './Screens.module.css';
import success from '../img/success.png';
import Image from 'next/image';
import classNames from 'classnames';

type SuccessScreenProps = {
    onClose: () => void;
    onResolve: (value: string) => void;
    walletName: string;
};

const SuccessScreen = ({ onClose, walletName, onResolve }: SuccessScreenProps): JSX.Element => {
    useEffect(() => {
        onResolve && onResolve(walletName);
        const timeout = setTimeout(onClose, 3000);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className={style.connectingScreen}>
            <p className={classNames(style.screenTitle, 't-inter-semi-bold')}>Mina Wallet</p>
            <Image src={success} alt="Success!" />
            <p className={classNames(style.connectingScreenSubtitle, 't-inter-semi-bold')}>
                <span>{walletName ?? 'wallet'}</span> Connected!
            </p>
        </div>
    );
};

export default SuccessScreen;

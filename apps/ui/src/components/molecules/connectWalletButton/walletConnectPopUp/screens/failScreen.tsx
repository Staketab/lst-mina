import Triangle from '../img/Triangle.svg';
import Image from 'next/image';
import { Button } from '../../../../atoms/button';
import classNames from 'classnames';
import { Logo } from '../../../../atoms/logo';
import { Loader } from '../../../../atoms/loader';

import style from './Screens.module.css';

type FailScreenProps = {
    walletName: string;
    walletImg?: string;
    installed?: boolean;
    onReturn?: () => void;
    onRetry?: (walletName: string, installed?: boolean) => void;
};

const FailScreen = ({ walletName, walletImg, installed, onReturn, onRetry }: FailScreenProps): JSX.Element => {
    return (
        <div className={style.failScreen}>
            <p className={classNames(style.screenTitle, 't-inter-semi-bold')}>Mina Wallet</p>
            <div className={style.loadingWrapper}>
                <div className={style.loadingWrapperIcon}>
                    <Logo />
                </div>
                <div className={style.failIcon}>
                    <Loader disabled />
                    <Image src={Triangle} alt="" className={style.failIconTriangle} />
                </div>
                <div className={style.loadingWrapperIcon}>
                    <Image src={walletImg} alt="" />
                </div>
            </div>
            <p className={style.failScreenSubtitle}>Connection Rejected!</p>
            <Button
                text="Try again"
                className={style.failScreenButton}
                onClick={() => onRetry(walletName, installed)}
            />
            <p className={style.failScreenBack} onClick={onReturn}>
                Back to wallets
            </p>
        </div>
    );
};

export default FailScreen;

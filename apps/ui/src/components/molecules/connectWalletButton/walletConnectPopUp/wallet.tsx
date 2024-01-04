import React from 'react';
import style from './WalletConnectPopUp.module.css';
import Image from 'next/image';
import classNames from 'classnames';

type WalletProps = {
    icon?: string;
    name?: string;
    installed?: boolean;
    onClick?: (name: string, installed?: boolean) => void;
};

const Wallet = ({ icon, name, installed, onClick }: WalletProps): JSX.Element => {
    return (
        <div className={classNames(style.walletListCard, 't-inter-semi-bold')} onClick={() => onClick(name, installed)}>
            <Image src={icon} alt="" className={style.walletListCardIcon} width={36} height={36} />
            <div className={style.walletListCardName}>{name}</div>
        </div>
    );
};

export default Wallet;

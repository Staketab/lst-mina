import Image from 'next/image';
import WalletIcon from './img/wallet.svg';
import style from './index.module.css';
import classNames from 'classnames';

const ConnectButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <div className={classNames(style.connectbutton, 't-inter-semi-bold')} onClick={onClick}>
            <Image src={WalletIcon} alt="" color="red" />
            <p>Connect</p>
        </div>
    );
};

export default ConnectButton;

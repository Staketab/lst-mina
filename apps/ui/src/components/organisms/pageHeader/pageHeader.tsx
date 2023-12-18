import { ConnectWalletButton } from '../../molecules/connectWalletButton';

import style from './index.module.css';

const PageHeader = () => {
    return (
        <div className={style.wrapper}>
            <ConnectWalletButton />
        </div>
    );
};

export default PageHeader;

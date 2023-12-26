import { useState } from 'react';
import classNames from 'classnames';
import { Button } from '../../atoms/button';
import { Variant } from '../../atoms/button/types';
import { ConnectWalletButton } from '../../molecules/connectWalletButton';
import StakeModalController from '../../molecules/stakeModal/StakeModalController';
import useAuroWalletCore from '../../../hooks/useAuroWalletCore';
import useAddressBalance from '../../../hooks/useAddressBalance';

import style from './index.module.css';
import { formatNum } from '../../../comman/helpers';

const PageHeader = () => {
    const [openStakeModul, setOpenStaekeModul] = useState<boolean>(false);
    const [isDisableStakeButton, setIsDisableStakeButton] = useState<boolean>(true);

    const { accountId } = useAuroWalletCore();
    const { balance } = useAddressBalance(accountId?.[0] ?? null);

    return (
        <div className={style.wrapper}>
            <div className={style.balanceInfo}>
                <span className={classNames(style.balance, 't-inter-medium')}>
                    Balance: {formatNum(balance, 3) || 0}
                </span>
            </div>
            <ConnectWalletButton handleAddress={setIsDisableStakeButton} />
            <Button
                className={style.stakeButton}
                text="Stake"
                variant={Variant.blue}
                onClick={() => setOpenStaekeModul(true)}
                disabled={isDisableStakeButton}
            />
            <StakeModalController open={openStakeModul} closeModal={() => setOpenStaekeModul(false)} />
        </div>
    );
};

export default PageHeader;

import { useState } from 'react';
import classNames from 'classnames';
import { Button } from '../../atoms/button';
import { Variant } from '../../atoms/button/types';
import { ConnectWalletButton } from '../../molecules/connectWalletButton';
import StakeModalController from '../../molecules/stakeModal/StakeModalController';
import useWallet from '../../../store/hooks/useWallet';

import style from './index.module.css';
import { formatNum } from '../../../comman/helpers';
import { useBalances } from '../../../store/hooks/useBalances';

const PageHeader = ({ isStakeAvailable }: { isStakeAvailable: boolean }): JSX.Element => {
    const [openStakeModul, setOpenStaekeModul] = useState<boolean>(false);
    const [isDisableStakeButton, setIsDisableStakeButton] = useState<boolean>(true);
    const { accountId, balance: balanceByWallet } = useWallet();
    const { balances } = useBalances();

    return (
        <div className={style.wrapper}>
            <div className={style.balanceInfo}>
                <span className={classNames(style.balance, 't-inter-medium')}>
                    Balance: {formatNum(String(balanceByWallet?.balance), 3) || 0}
                </span>
                <span className={classNames(style.balance, 't-inter-medium')}>
                    stMina: {formatNum(balances[accountId?.[0]] || 0, 3) || 0}
                </span>
            </div>
            <ConnectWalletButton handleAddress={setIsDisableStakeButton} />
            <Button
                className={style.stakeButton}
                text="Stake"
                variant={Variant.blue}
                onClick={() => setOpenStaekeModul(true)}
                disabled={isDisableStakeButton || !isStakeAvailable}
            />
            <StakeModalController open={openStakeModul} closeModal={() => setOpenStaekeModul(false)} />
        </div>
    );
};

export default PageHeader;

import { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { Button } from '../../atoms/button';
import { Variant } from '../../atoms/button/types';
import { ConnectWalletButton } from '../../molecules/connectWalletButton';
import StakeModalController from '../../molecules/stakeModal/StakeModalController';
import useAuroWalletCore from '../../../hooks/useAuroWalletCore';
import useAddressBalance from '../../../hooks/useAddressBalance';
import DollarIcon from './Dollar.svg';

import style from './index.module.css';
import { ApiClient } from '../../../api/apiClient';
import { formatNum } from '../../../comman/helpers';

const apiBalance = new ApiClient('https://minascan.io/mainnet/api/api/widgets/get-price');

const PageHeader = () => {
    const [openStakeModul, setOpenStaekeModul] = useState<boolean>(false);
    const [isDisableStakeButton, setIsDisableStakeButton] = useState<boolean>(true);
    const [price, setPrice] = useState<{
        change24h?: number;
        price?: number;
    }>(null);
    const { accountId } = useAuroWalletCore();
    const { balance } = useAddressBalance(accountId?.[0] ?? null);
    const getPrice = async () => {
        const res = await apiBalance.fetchData();
        setPrice(res);
    };
    useEffect(() => {
        getPrice();
    }, []);

    const renderBalance = (lable, balance, change?: number) => {
        const symbol = change >= 0 ? '+' : '-';
        return (
            <span className={classNames(style.balance, 't-inter-medium')}>
                {lable}:
                <Image src={DollarIcon} alt="" /> {formatNum(balance, 3) || 0}
                {typeof change == 'number' && (
                    <span
                        className={classNames(style.change, {
                            [style.changeMinus]: change < 0,
                        })}
                    >
                        {symbol}
                        {formatNum(change, 2)}%
                    </span>
                )}
            </span>
        );
    };
    return (
        <div className={style.wrapper}>
            <div className={style.balanceInfo}>
                {renderBalance('Balance', balance)}
                {renderBalance('Mina', price?.price, price?.change24h)}
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

import { useMemo } from 'react';
import style from './Screens.module.css';
import Wallet from '../wallet';
import CustomScrollList from '../../../customScrollList';
import classNames from 'classnames';

const WalletList = ({ list, cardClickHandler, isMobile, isMobileConnection }) => {
    const [installed, avaliable] = useMemo(() => {
        if (list?.length < 1) return [[], []];
        return [list.filter((el) => el.installed), list.filter((el) => !el.installed)];
    }, [list]);

    const hasInstalled = installed.length > 0;
    const wallets = [installed, avaliable];

    const isWalletsUnvaliable = installed.length === 0;
    const isDesctopeAndHasNotInstalledWallet = !isMobile && !isMobileConnection;
    const isMobileAndHasInstalledWallet = !isDesctopeAndHasNotInstalledWallet && !isWalletsUnvaliable;

    const renderWallet = ({ icon, name, installed }) => {
        return <Wallet key={name} icon={icon} name={name} installed={installed} onClick={cardClickHandler} />;
    };

    return (
        <div className={style.walletList}>
            {isDesctopeAndHasNotInstalledWallet &&
                wallets.map((array, i) =>
                    array.length > 0 ? (
                        <div className={style.listBlock} key={array[0]?.name}>
                            <p className={classNames(style.screenTitle, 't-inter-semi-bold')}>
                                {hasInstalled ? (i === 0 && 'Installed') || 'More' : 'Available Wallets'} (
                                {array.length ?? '-'})
                            </p>
                            <div className={style.wrapper}>
                                <CustomScrollList
                                    maxHeight={'calc(90vh - 280px)'}
                                    className={style.walletListRowWrapper}
                                    listClassName={style.walletListList}
                                    listStyle={{
                                        [!isMobile ? 'paddingRight' : 'paddingBottom']: 16,
                                    }}
                                    horizontal={isMobile}
                                >
                                    <div className={style.walletListRow}>{array.map(renderWallet)}</div>
                                </CustomScrollList>
                            </div>
                        </div>
                    ) : null
                )}
            {isMobileAndHasInstalledWallet && (
                <div className={style.wrapper}>
                    <CustomScrollList
                        maxHeight={'calc(90vh - 280px)'}
                        className={style.walletListRowWrapper}
                        listClassName={style.walletListList}
                        listStyle={{ [!isMobile ? 'paddingRight' : 'paddingBottom']: 16 }}
                        horizontal={isMobile}
                    >
                        <div className={style.walletListRow}>{installed.map(renderWallet)}</div>
                    </CustomScrollList>
                </div>
            )}

            {isWalletsUnvaliable && <div className={style.noWallets}>No wallets avaliable</div>}
        </div>
    );
};

export default WalletList;

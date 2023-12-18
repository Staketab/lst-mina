import { useState } from 'react';
import useAuroWallet from '../../../hooks/useAuroWallet';
import classNames from 'classnames';

import style from './index.module.css';
import ButtonWithAddress from './buttonWithAddress';
import ConnectButton from './connectButton';
import WalletConnectPopUp from './walletConnectPopUp';
import getWalletConfig from './hellper';

const ConnectWalletButton = () => {
    const [showPopup, setShowPopup] = useState(false);

    const {
        accountId,
        connectMessage,
        actions: { onConnectClick, resetConnectMessage, onDisconnectClick },
    } = useAuroWallet();

    const walletName = accountId ? 'Auro Wallet' : null;

    const closeHandler = () => {
        resetConnectMessage();
        setShowPopup(false);
    };

    const address = accountId?.[0];

    const handleConnect = () => {
        setShowPopup(true);
    };

    return (
        <div>
            <div className={classNames(style.plate, { [style.connect]: !address })}>
                {address ? (
                    <ButtonWithAddress
                        address={address}
                        onDisconnect={async () => {
                            await onDisconnectClick();
                        }}
                    />
                ) : (
                    <ConnectButton onClick={handleConnect} />
                )}
            </div>
            <WalletConnectPopUp
                walletName={walletName}
                connected={!!accountId}
                rejected={connectMessage === 'user reject'}
                connectFunction={onConnectClick}
                onClose={closeHandler}
                list={getWalletConfig()}
                show={showPopup}
                keyID="walletConnectPopUp"
                zIndex={52}
                onResolve={(data) => console.log(data)}
            />
        </div>
    );
};

export default ConnectWalletButton;

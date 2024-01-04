import { useState } from 'react';
import classNames from 'classnames';

import style from './index.module.css';
import ButtonWithAddress from './buttonWithAddress';
import ConnectButton from './connectButton';
import WalletConnectPopUp from './walletConnectPopUp';
import getWalletConfig from './hellper';
import useWallet from '../../../store/hooks/useWallet';

const ConnectWalletButton = ({ handleAddress }: { handleAddress: (value: boolean) => void }) => {
    const [showPopup, setShowPopup] = useState(false);
    const {
        accountId,
        connectMessage,
        actions: { onConnectWallet, onDisconnectWallet, setConnectMessage },
    } = useWallet();

    const walletName = accountId ? 'Auro Wallet' : null;

    const closeHandler = () => {
        setConnectMessage(null);
        setShowPopup(false);
    };

    const address = accountId?.[0];

    handleAddress(!address);

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
                            await onDisconnectWallet();
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
                connectFunction={onConnectWallet}
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

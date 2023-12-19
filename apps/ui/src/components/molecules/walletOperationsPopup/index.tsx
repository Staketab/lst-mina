import React from 'react';
import PopupOverlay from '../popupOverlay';
import WalletOperationsPopupCore from './core';
import { useMedia } from '../../../hooks';

export const walletActions = {
    stake: 'stake',
    send: 'send',
};

export const defaultFees = {
    slow: 0.0011,
    default: 0.0101,
    fast: 0.2001,
};

const WalletOperationsPopup = (props) => {
    const {
        greater: { xs: xsScreen },
    } = useMedia();
    const { open, zIndex = 50, onClose = () => {} } = props;

    return (
        <PopupOverlay
            position={xsScreen ? 'center' : 'bottom'}
            animation="appear"
            onClose={onClose}
            show={open}
            zIndex={zIndex}
        >
            {open ? <WalletOperationsPopupCore {...props} /> : null}
        </PopupOverlay>
    );
};

export default WalletOperationsPopup;

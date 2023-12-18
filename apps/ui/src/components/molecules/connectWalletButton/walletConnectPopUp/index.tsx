import WalletConnectPopUpCore from './core';
import PopupOverlay from '../../popupOverlay';
import { useMedia } from '../../../../hooks';

const WalletConnectPopUp = (props) => {
    const media = useMedia();
    const isMobile = !media.greater.xs;
    const { show, zIndex = 50, onClose = () => null } = props;

    return (
        <PopupOverlay
            position={!isMobile ? 'center' : 'bottom'}
            animation="appear"
            onClose={onClose}
            show={show}
            zIndex={zIndex}
        >
            <WalletConnectPopUpCore {...props} />
        </PopupOverlay>
    );
};

export default WalletConnectPopUp;

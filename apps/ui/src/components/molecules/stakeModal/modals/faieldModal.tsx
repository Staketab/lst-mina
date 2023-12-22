import { ModalsController, ModalsTypes } from '../StakeModalController';
import closeIcon from '../img/Close.svg';
import faieldIcon from '../img/Failed.svg';
import Image from 'next/image';
import { AlertMessage, VariantsAlertMessage } from '../../../atoms/alertMessage';
import StakeModalsWrapper from '../../stakeModalsWrapper/stakeModalsWrapper';

import style from '../index.module.css';

type FaieldContentProps = {
    modalsController: ModalsController;
    message?: string;
    openedModals: ModalsTypes[];
};

const FaieldContent = ({ modalsController, message, openedModals }: FaieldContentProps): JSX.Element => {
    return (
        <StakeModalsWrapper openedModals={openedModals} modalsController={modalsController} closeIcon={closeIcon}>
            <div className={style.successContent}>
                <Image src={faieldIcon} alt="" className={style.successIcon} />
                <p className="t-inter-bold">Transaction Failed</p>
                <AlertMessage variant={VariantsAlertMessage.ERROR} text={message || 'unknown error'} />
            </div>
        </StakeModalsWrapper>
    );
};

export default FaieldContent;

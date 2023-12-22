import Image from 'next/image';
import successIcon from '../img/Applied.svg';
import closeIcon from '../img/Close.svg';
import { ModalsController, ModalsTypes } from '../StakeModalController';
import StakeModalsWrapper from '../../stakeModalsWrapper/stakeModalsWrapper';

import style from '../index.module.css';

type SuccessContentProps = {
    modalsController: ModalsController;
    openedModals: ModalsTypes[];
};

const SuccessContent = ({ modalsController, openedModals }: SuccessContentProps): JSX.Element => {
    return (
        <StakeModalsWrapper openedModals={openedModals} modalsController={modalsController} closeIcon={closeIcon}>
            <div className={style.successContent}>
                <Image src={successIcon} alt="" className={style.successIcon} />
                <p className="t-inter-bold">Your transaction is being broadcast</p>
            </div>
        </StakeModalsWrapper>
    );
};

export default SuccessContent;

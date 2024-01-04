import Image from 'next/image';
import successIcon from '../img/Applied.svg';
import closeIcon from '../img/Close.svg';
import { ModalsController, ModalsTypes } from '../StakeModalController';
import StakeModalsWrapper from '../../stakeModalsWrapper/stakeModalsWrapper';

import style from '../index.module.css';
import { useEffect } from 'react';
import { useFaucet } from '../../../../hooks/useFacet';

type SuccessContentProps = {
    modalsController: ModalsController;
    openedModals: ModalsTypes[];
    stakeAmount: number;
};

const SuccessContent = ({ modalsController, openedModals, stakeAmount }: SuccessContentProps): JSX.Element => {
    const drip = useFaucet(stakeAmount);

    useEffect(() => {
        drip().then((data) => console.log(data));
    }, []);

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

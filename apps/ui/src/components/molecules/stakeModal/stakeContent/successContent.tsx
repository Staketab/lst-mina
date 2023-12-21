import Image from 'next/image';
import successIcon from '../img/Applied.svg';
import closeIcon from '../img/Close.svg';
import { ModalsController } from '../stakeModal';
import { Button } from '../../../atoms/button';
import { Variant } from '../../../atoms/button/types';
import style from '../index.module.css';

type SuccessContentProps = {
    modalsController: ModalsController;
};

const SuccessContent = ({ modalsController }: SuccessContentProps): JSX.Element => {
    return (
        <div className={style.successContent}>
            <Image src={closeIcon} alt="" onClick={() => modalsController.close()} className={style.closeIcon} />
            <Image src={successIcon} alt="" className={style.successIcon} />
            <p className="t-inter-bold">Your transaction is being broadcast</p>
            <Button text="See Details" variant={Variant.blue} className={style.moreDetailsButton} />
        </div>
    );
};

export default SuccessContent;

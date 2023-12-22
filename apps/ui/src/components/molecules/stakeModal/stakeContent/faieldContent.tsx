import { ModalsController } from '../stakeModal';
import closeIcon from '../img/Close.svg';
import faieldIcon from '../img/Failed.svg';
import style from '../index.module.css';
import Image from 'next/image';
import { AlertMessage, VariantsAlertMessage } from '../../../atoms/alertMessage';

type FaieldContentProps = {
    modalsController: ModalsController;
    message?: string;
};

const FaieldContent = ({ modalsController, message }: FaieldContentProps): JSX.Element => {
    return (
        <div className={style.successContent}>
            <Image src={closeIcon} alt="" onClick={() => modalsController.close()} className={style.closeIcon} />
            <Image src={faieldIcon} alt="" className={style.successIcon} />
            <p className="t-inter-bold">Transaction Failed</p>
            <AlertMessage variant={VariantsAlertMessage.ERROR} text={message || 'unknown error'} />
        </div>
    );
};

export default FaieldContent;

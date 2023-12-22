import Image from 'next/image';
import backIcon from '../img/Back.svg';

import style from '../index.module.css';
import classNames from 'classnames';
import { NETWORK } from '../../../../comman/constants';
import { Button } from '../../../atoms/button';
import { Variant } from '../../../atoms/button/types';
import { ModalsController, ModalsTypes } from '../stakeModal';
import { SendPaymentresponse } from '../../../../hooks/useAuroWallet';

type ConfirmContentProps = {
    modalsController: ModalsController;
    onStake: () => Promise<SendPaymentresponse | void>;
};

const ConfirmContent = ({ modalsController, onStake }: ConfirmContentProps): JSX.Element => {
    const handleContinueButton = () => {
        onStake()
            .then((data: SendPaymentresponse) => {
                if ('hash' in data) {
                    modalsController.set(ModalsTypes.SECCUSS);
                } else {
                    modalsController.set(ModalsTypes.FAILED);
                }
            })
            .catch(() => modalsController.set(ModalsTypes.FAILED));
    };

    return (
        <div>
            <Image
                src={backIcon}
                alt=""
                className={style.backIcon}
                onClick={() => modalsController.set(ModalsTypes.STAKE)}
            />
            <p className={classNames(style.stakeContentHeader, 't-inter-semi-bold')}>Stake Mina</p>
            <p className={classNames(style.stakeContentBody, 't-inter-semi-bold')}>
                {`Make sure that the '${NETWORK}' network is selected in the wallet.`}{' '}
            </p>
            <div className={style.buttonsBlock}>
                <Button text="Cancel" onClick={() => modalsController.close()} variant={Variant.cancel} />
                <Button text="Continue" onClick={handleContinueButton} variant={Variant.blue} />
            </div>
        </div>
    );
};

export default ConfirmContent;

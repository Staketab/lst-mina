import classNames from 'classnames';
import { useMedia } from '../../../hooks';
import PopupOverlay from '../popupOverlay';
import Image from 'next/image';
import { ModalsController, ModalsTypes } from '../stakeModal/StakeModalController';
import { ReactNode } from 'react';
import style from './index.module.css';

type StakeModalsWrapperProps = {
    openedModals: ModalsTypes[];
    modalsController: ModalsController;
    children: ReactNode;
    title?: string;
    backIcon?: string;
    closeIcon?: string;
};

const StakeModalsWrapper = ({
    openedModals,
    modalsController,
    children,
    title,
    backIcon,
    closeIcon,
}: StakeModalsWrapperProps): JSX.Element => {
    const {
        greater: { xs: xsScreen },
    } = useMedia();
    return (
        <PopupOverlay
            position={xsScreen ? 'center' : 'bottom'}
            animation="appear"
            onClose={() => modalsController.close()}
            show={!!openedModals.length}
        >
            <div className={style.wrapper}>
                {backIcon && (
                    <Image src={backIcon} alt="" className={style.backIcon} onClick={() => modalsController.close()} />
                )}
                {closeIcon && (
                    <Image
                        src={closeIcon}
                        alt=""
                        onClick={() => modalsController.close()}
                        className={style.closeIcon}
                    />
                )}
                <p className={classNames(style.stakeContentHeader, 't-inter-semi-bold')}>{title}</p>
                {children}
            </div>
        </PopupOverlay>
    );
};

export default StakeModalsWrapper;

import React, { ReactNode } from 'react';
import style from './DropdownWrapper.module.css';
import classNames from 'classnames';
import CloseIcon from './Close.svg';
import Image from 'next/image';
import { useMedia } from '../../../hooks';
import PopupOverlay from '../popupOverlay';

type DropdownWrapperProps = {
    children: ReactNode;
    minWidth?: string;
    className?: string;
    show: boolean;
    onClose: () => void;
    centered?: boolean;
};

const DropdownWrapper = ({ children, className, show, onClose }: DropdownWrapperProps): JSX.Element => {
    const media = useMedia();

    return media.greater.sm && show ? (
        <div className={classNames(style.dropdownWrapper, className)} onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    ) : (
        <PopupOverlay position="bottom" animation="slideUp" onClose={onClose} show={show}>
            <div className={style.dropdownWrapperMobile}>
                <div className={style.dropdownWrapperMobileHeader}>
                    <p></p>
                    <Image src={CloseIcon} alt="" onClick={onClose} />
                </div>
                <div className={style.dropdownWrapperMobileContent}>{children}</div>
            </div>
        </PopupOverlay>
    );
};

export default DropdownWrapper;

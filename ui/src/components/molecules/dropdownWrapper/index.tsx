import React from 'react';
import style from './DropdownWrapper.module.css';
import classNames from 'classnames';
import CloseIcon from './Close.svg';
import Image from 'next/image';
import { useMedia, useSpaceToRight } from '../../../hooks';
import PopupOverlay from '../popupOverlay';

const DropdownWrapper = ({
    children,
    minWidth = '305px',
    maxHeight,
    className,
    show,
    onClose,
    parentRef,
    forceToRight = false,
    forceToLeft = false,
    centered = false,
}) => {
    const media = useMedia(0);
    const hasSpaceToRight = useSpaceToRight(parentRef?.current, minWidth + 20);

    return media.greater.sm && show ? (
        <div
            className={classNames(style.dropdownWrapper, className ?? null, {
                [style.toLeft]: (!hasSpaceToRight && !forceToRight) || forceToLeft,
                [style.toCenter]: centered,
            })}
            style={{ minWidth, maxHeight }}
            onClick={(e) => e.stopPropagation()}
        >
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
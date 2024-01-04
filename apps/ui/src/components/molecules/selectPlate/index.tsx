import React from 'react';
import style from './SelectPlate.module.css';
import ArrowIcon from './img/Arrow.svg';
import classNames from 'classnames';
import Image from 'next/image';

const SelectPlate = ({
    clickHandler,
    expanded,
    title,
    selectedCount = 0,
    isActive,
    disable,
    minWidth = '0px',
    height,
}) => {
    const active = selectedCount > 0 || isActive;

    return (
        <div
            className={classNames(style.selectPlate, expanded && style.expanded, active && style.active)}
            style={{ minWidth, height }}
            onClick={!disable ? clickHandler : null}
        >
            <span className={classNames('t-inter-semi-bold', style.selectTitle)}>{title}</span>
            <Image
                src={ArrowIcon}
                alt=""
                style={{ transform: !expanded ? 'rotateX(0deg)' : '' }}
                className={classNames(style.arrow, disable && style.arrowDisabled)}
            />
        </div>
    );
};

export default SelectPlate;

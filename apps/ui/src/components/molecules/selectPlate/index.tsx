import React from 'react';
import style from './SelectPlate.module.css';
import ArrowIcon from './img/Arrow.svg';
import classNames from 'classnames';
import Image from 'next/image';

type SelectPlateProps = {
    onClick: () => void;
    expanded: boolean;
    title: string;
    disable: boolean;
};

const SelectPlate = ({ onClick, expanded, title, disable }: SelectPlateProps): JSX.Element => {
    return (
        <div className={classNames(style.selectPlate, expanded && style.expanded)} onClick={!disable ? onClick : null}>
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

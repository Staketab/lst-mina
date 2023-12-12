import React from 'react';
import InfoIcon from './infoIcon.svg';

import styles from './index.module.css';
import classNames from 'classnames';
import Image from 'next/image';

const InfoIconComponent = ({ className }: { className?: string }): JSX.Element => {
    return (
        <span className={classNames(styles.infoIcon, className)}>
            <Image src={InfoIcon} alt="" />
        </span>
    );
};

export default InfoIconComponent;

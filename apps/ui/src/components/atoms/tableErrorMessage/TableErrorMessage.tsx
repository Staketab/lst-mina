import React from 'react';
import noDataIcon from './img/tablePlaceholder.svg';

import styles from './index.module.css';
import classNames from 'classnames';
import Image from 'next/image';

const TableErrorMessage = () => {
    return (
        <div className={classNames(styles.errorScreen, 'container')}>
            <Image src={noDataIcon} alt="" />
            <p className={classNames(styles.errorTitle, 't-inter-semi-bold')}>There is no data yet</p>
        </div>
    );
};
export default TableErrorMessage;

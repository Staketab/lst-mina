import React from 'react';
import noDataIcon from './img/tablePlaceholder.svg';

import styles from './index.module.css';
import classNames from 'classnames';
import Image from 'next/image';

const TableErrorMessage = () => {
    const errorTitle = 'There is no data yet';
    const icon = <Image src={noDataIcon} alt="" />;
    return (
        <div className={classNames(styles.errorScreen, 'container')}>
            {icon}
            <p className={classNames(styles.errorTitle)}>{errorTitle}</p>
        </div>
    );
};
export default TableErrorMessage;

import React from 'react';
import ClearIcon from './img/clear.svg';

import styles from './Table.module.css';
import Image from 'next/image';

const ErrorMessage = ({ errorText, onClearStr }) => {
    return (
        <div className={styles.errorScreen}>
            <p className={styles.errorTitle}>{errorText ?? 'There is no data yet'}</p>
            {onClearStr && (
                <button className={styles.button} onClick={onClearStr}>
                    <Image src={ClearIcon} alt="" />
                    Clear filters
                </button>
            )}
        </div>
    );
};
export default ErrorMessage;

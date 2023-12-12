import React from 'react';
import clearIcon from './img/clear.svg';
import noFoundDataIcon from './img/noDataIcon.svg';
import noDataIcon from './img/tablePlaceholder.svg';

import styles from './index.module.css';
import classNames from 'classnames';
import Image from 'next/image';

type TableErrorMessageProps = {
    onClearStr: () => void;
    registerUrl: string;
};

const TableErrorMessage = ({ onClearStr, registerUrl }: TableErrorMessageProps) => {
    const errorTitle = onClearStr ? 'No matches found' : 'There is no data yet';
    const icon = onClearStr ? <Image src={noFoundDataIcon} alt="" /> : <Image src={noDataIcon} alt="" />;
    const descriptionError = registerUrl
        ? 'This name is free and you can register it using Sui Name Services (SuiNS)'
        : 'Please try adjusting or removing selected filters.';
    return (
        <div className={classNames(styles.errorScreen, 'container')}>
            {icon}
            <p
                className={classNames(styles.errorTitle, {
                    [styles.errorTitleWithBtn]: onClearStr,
                })}
            >
                {errorTitle}
            </p>
            {onClearStr && <p className={styles.descriptionError}>{descriptionError}</p>}
            {onClearStr && (
                <>
                    <button className={styles.button} onClick={onClearStr}>
                        <Image src={clearIcon} alt="" />
                        Clear filters
                    </button>
                </>
            )}
        </div>
    );
};
export default TableErrorMessage;

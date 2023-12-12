import React from 'react';
import styles from './index.module.css';

const Dot = ({ isHeader, noRedirect }) => {
    const backgroundHeader = isHeader && 'rgba(0, 0, 0, 0.8)';
    const backgroundNoRedirect = (noRedirect && 'var(--link-inactive-color)') || 'var(--link-active-color)';
    return (
        <div
            className={styles.dot}
            style={{
                background: backgroundHeader || backgroundNoRedirect,
            }}
        />
    );
};

export default Dot;

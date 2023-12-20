import classNames from 'classnames';
import React, { ReactNode } from 'react';

import styles from './button.module.css';
import { Variant } from './types';

interface ApiButtonProps {
    /**
     * Button contents
     */
    text?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    className?: string;
    variant?: Variant;
    id?: string;
    children?: ReactNode;
}

export const Button = ({ text, onClick, disabled, className, variant, id, children }: ApiButtonProps): JSX.Element => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick && onClick(event);
    };

    const content = children ? children : text;

    return (
        <button
            id={id || null}
            className={classNames(styles.apiButton, 't-inter-semi-bold', className, {
                [styles[variant]]: variant,
            })}
            onClick={handleClick}
            disabled={disabled}
        >
            {content}
        </button>
    );
};

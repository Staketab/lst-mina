import React, { useState, useEffect, CSSProperties } from 'react';
import Icon from './img/Copy.svg';
import IconPressed from './img/CopyPressed.svg';

import styles from './copyIcon.module.css';
import classNames from 'classnames';
import Image from 'next/image';

type CopyIconProps = {
    onClick: () => void;
    changeIsCopy?: (value: boolean) => void;
    isCopy?: boolean;
    className?: string;
    style?: CSSProperties;
    mobile?: boolean;
    width?: number;
    height?: number;
    wrapperWidth?: string;
    wrapperHeight?: string;
    wrapperClassName?: string;
};

export default function CopyIcon({
    onClick = () => {},
    changeIsCopy,
    isCopy,
    className,
    style,
    mobile,
    width = 12,
    height = 14,
    wrapperWidth,
    wrapperHeight,
    wrapperClassName,
}: CopyIconProps): JSX.Element {
    const [pressed, setPressed] = useState(false);
    const [showPressed, setShowPressed] = useState(false);

    const copyHandler = (e) => {
        e.stopPropagation();
        onClick();
        changeIsCopy && changeIsCopy(true);
        if (!pressed) {
            setPressed(true);
            setTimeout(() => {
                setShowPressed(true);
            }, 150);
        }
    };

    useEffect(() => {
        if (pressed || isCopy) {
            const timeout = setTimeout(() => {
                changeIsCopy && changeIsCopy(false);
                setPressed(false);
            }, 1500);
            return () => {
                clearTimeout(timeout);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pressed, isCopy]);

    useEffect(() => {
        if (showPressed) {
            const timeout = setTimeout(() => {
                setShowPressed(false);
            }, 1350);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [showPressed]);

    return (
        <>
            <div
                className={classNames(styles.animated, wrapperClassName, {
                    [styles.desktop]: !mobile,
                })}
                style={{
                    width: wrapperWidth,
                    height: wrapperHeight,
                    minWidth: wrapperWidth,
                    minHeight: wrapperHeight,
                    ...style,
                }}
                onClick={copyHandler}
            >
                <Image
                    src={Icon}
                    alt=""
                    className={classNames(
                        styles.copyIcon,
                        {
                            [styles.animationSlide]: pressed,
                        },
                        styles.original,
                        className
                    )}
                    width={width}
                    height={height}
                    style={{
                        left: `calc(50% - ${parseInt(`${width}`) / 2}px)`,
                    }}
                />
                {(showPressed || isCopy) && (
                    <Image
                        src={IconPressed}
                        alt=""
                        className={classNames(styles.copyIcon, styles.pressed, className)}
                    />
                )}
            </div>
        </>
    );
}

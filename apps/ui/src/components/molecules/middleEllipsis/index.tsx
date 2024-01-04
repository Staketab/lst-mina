import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import styles from './index.module.css';

import classNames from 'classnames';
import Dot from './dot';

const MiddleEllipsis = ({
    string,
    end,
    visible,
    fontWeight,
    noRedirect,
    fontSize,
    isHeader,
    breadCrumbs,
    onClick,
    color,
}) => {
    const strLength = end || 5;
    const [firstString, setFirstString] = useState(string.slice(0, strLength - 2));
    const [secondString, setSecondString] = useState(string.slice(-strLength + 1));
    const [showDots, setShowDots] = useState(false);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        if (strLength - 1 === 4 || strLength - 1 < 4) {
            setFirstString(string.slice(0, 4));
            setSecondString(string.slice(-4));
            setShowDots(true);
        } else if (strLength * 2 < string.length) {
            setFirstString(string.slice(0, strLength - 2));
            setSecondString(string.slice(-strLength + 1));
            setShowDots(true);
        } else {
            setFirstString(string);
            setSecondString('');
            setShowDots(false);
        }
    }, [strLength, string]);

    return (
        <div
            className={styles.middleEllipsis}
            style={{ visibility: visible ? 'initial' : 'hidden' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
        >
            <div
                className={classNames(styles.middleEllipsisStringStart, {
                    [styles.inactive]: noRedirect && !hovered,
                    [styles.inactiveHovered]: noRedirect && hovered,
                    [styles.active]: !noRedirect && !hovered,
                    [styles.activeHovered]: !noRedirect && hovered,
                    [styles.isHeader]: isHeader,
                    [styles.breadCrumbs]: breadCrumbs,
                })}
                style={{
                    fontWeight,
                    fontSize,
                    color: noRedirect ? color : null,
                }}
            >
                {firstString}
            </div>
            {showDots && (
                <div className={styles.dots}>
                    <Dot isHeader={isHeader} noRedirect={noRedirect} />
                    <Dot isHeader={isHeader} noRedirect={noRedirect} />
                    <Dot isHeader={isHeader} noRedirect={noRedirect} />
                </div>
            )}
            <div
                className={classNames(styles.middleEllipsisStringEnd, {
                    [styles.inactive]: noRedirect && !hovered,
                    [styles.inactiveHovered]: noRedirect && hovered,
                    [styles.active]: !noRedirect && !hovered,
                    [styles.activeHovered]: !noRedirect && hovered,
                    [styles.isHeader]: isHeader,
                    [styles.breadCrumbs]: breadCrumbs,
                })}
                style={{
                    fontWeight,
                    fontSize,
                    color: noRedirect ? color : null,
                }}
            >
                {secondString}
            </div>
        </div>
    );
};

type MiddleEllipsisCustomProps = {
    children: React.ReactNode;
    style?: CSSProperties;
    width?: any;
    noRedirect?: boolean;
    fontWeight?: string | number;
    fontSize?: any;
    isHeader?: boolean;
    breadCrumbs?: boolean;
    onClick?: () => void;
    className?: string;
    color?: string;
};

const MiddleEllipsisCustom = ({
    children,
    style,
    width,
    noRedirect,
    fontWeight,
    fontSize,
    isHeader,
    breadCrumbs,
    onClick,
    className,
    color,
}: MiddleEllipsisCustomProps): JSX.Element => {
    const ref = useRef(null);
    const [startAndEnd, setStartAndEnd] = useState(0);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => setVisible(true), 50);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        if (fontSize) {
            const widthSymbol = fontSize.replace(/[^0-9]/g, '') * 0.6;
            setStartAndEnd(Math.floor(width / widthSymbol / 2));
        }
    }, [width, fontSize]);

    return (
        <div
            className={classNames(styles.container, className)}
            ref={ref}
            style={isNaN(width) ? { maxWidth: '100%', ...style } : { maxWidth: width, ...style }}
        >
            <MiddleEllipsis
                string={children}
                end={startAndEnd || null}
                visible={visible}
                fontWeight={fontWeight}
                noRedirect={noRedirect}
                fontSize={fontSize}
                isHeader={isHeader}
                breadCrumbs={breadCrumbs}
                onClick={onClick}
                color={color}
            />
        </div>
    );
};

export default MiddleEllipsisCustom;

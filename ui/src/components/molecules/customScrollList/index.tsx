import React, { CSSProperties, Children, useEffect, useMemo } from 'react';
import styles from './CustomScrollList.module.css';
import classNames from 'classnames';
import { useRef } from 'react';
import { isNumber } from 'lodash';

type CustomScrollListProps = {
    children: React.ReactNode;
    maxHeight?: string;
    maxWidth?: string;
    style?: CSSProperties;
    listStyle?: CSSProperties;
    className?: string;
    listClassName?: string;
    fullScrolledHandler?: (value: boolean) => void;
    handlerOffset?: number;
    horizontal?: boolean;
    setCurrentScroll?: (value: number) => void;
    scrollTo?: string;
    onScroll?: (value: React.MouseEvent) => void;
};

const CustomScrollList = ({
    children,
    maxHeight,
    maxWidth = '100%',
    style,
    listStyle,
    className,
    listClassName,
    fullScrolledHandler,
    handlerOffset = 50,
    horizontal,
    setCurrentScroll,
    scrollTo,
    onScroll,
}: CustomScrollListProps): JSX.Element => {
    const ref = useRef(null);
    const wrapperRef = useRef(null);

    const isScrollable = useMemo(() => {
        return horizontal
            ? ref.current?.scrollWidth > ref.current?.clientWidth
            : ref.current?.scrollHeight > ref.current?.clientHeight;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children, horizontal, ref.current]);

    const scrollHandler = (e) => {
        fullScrolledHandler?.(e.target.scrollHeight - e.target.offsetHeight - e.target.scrollTop < handlerOffset);
        setCurrentScroll?.(e.target.scrollTop);
        onScroll?.(e);
    };

    useEffect(() => {
        if (fullScrolledHandler || setCurrentScroll || onScroll) {
            wrapperRef.current?.addEventListener('scroll', scrollHandler);
        }
        return () => {
            wrapperRef.current?.removeEventListener('scroll', scrollHandler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wrapperRef.current, scrollHandler]);

    const stylesObj: CSSProperties = {
        overflowY: horizontal ? 'hidden' : 'auto',
        overflowX: horizontal ? 'auto' : 'hidden',
    };

    useEffect(() => {
        if (wrapperRef.current && isNumber(scrollTo)) {
            wrapperRef.current.scrollTo({ top: scrollTo, behavior: 'smooth' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollTo, wrapperRef.current]);

    return (
        <div
            className={classNames(styles.customScrollList, listClassName)}
            style={{
                ...listStyle,
                [!isScrollable && !horizontal && 'paddingRight']: 0,
                [!isScrollable && horizontal && 'paddingBottom']: 0,
                ...stylesObj,
            }}
            ref={wrapperRef}
        >
            <div className={styles.list} style={{ maxHeight: maxHeight, maxWidth: maxWidth }} ref={ref}>
                {Children.map(children, (el, index) => (
                    <div className={classNames(styles.item, className)} style={style} key={index}>
                        {el}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomScrollList;

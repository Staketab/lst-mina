import React, { Children, useEffect, useRef } from 'react';
import styles from './CustomScrollList.module.css';
import classNames from 'classnames';
import { isNumber } from 'lodash';

type CustomScrollListProps = {
    children: React.ReactNode;
    fullScrolledHandler?: (value: boolean) => void;
    className?: string;
    listClassName?: string;
    handlerOffset?: number;
    setCurrentScroll?: (value: number) => void;
    scrollTo?: string;
    onScroll?: (value: React.MouseEvent) => void;
};

const CustomScrollList = ({
    children,
    className,
    listClassName,
    fullScrolledHandler,
    handlerOffset = 50,
    setCurrentScroll,
    scrollTo,
    onScroll,
}: CustomScrollListProps): JSX.Element => {
    const ref = useRef(null);
    const wrapperRef = useRef(null);

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

    useEffect(() => {
        if (wrapperRef.current && isNumber(scrollTo)) {
            wrapperRef.current.scrollTo({ top: scrollTo, behavior: 'smooth' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollTo, wrapperRef.current]);

    return (
        <div className={classNames(styles.customScrollList, listClassName)} ref={wrapperRef}>
            <div className={styles.list} ref={ref}>
                {Children.map(children, (el, index) => (
                    <div className={classNames(styles.item, className)} key={index}>
                        {el}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomScrollList;

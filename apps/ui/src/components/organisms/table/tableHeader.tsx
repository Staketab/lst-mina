import React from 'react';
import style from './Table.module.css';
import classNames from 'classnames';
import SortIcon from './img/SortIcon.svg';
import { useMedia } from '../../../hooks';
import Image from 'next/image';
import { ORDER_BY } from '../../../comman/types';

const TableHeader = ({
    config,
    isLoading,
    sortBy,
    orderBy,
    initialOrderBy,
    onSortChange,
    onOrderChange,
    hidePagination,
    showPagination,
    isHiddenBorderBottom,
}) => {
    const {
        greater: { sm: smScreen, lg: lgScreen },
    } = useMedia();

    const sortClickHandler = (sortName, initialOrder) => {
        if (isLoading) return;
        if (sortName === sortBy) {
            return onOrderChange(orderBy === ORDER_BY.DESC ? ORDER_BY.ASC : ORDER_BY.DESC);
        }
        onSortChange(sortName);
        onOrderChange(initialOrder ?? initialOrderBy);
    };

    return config.map((el, i) => {
        const mobilePaddingRight = !smScreen && el.style?.mobilePaddingRight;
        const tabletPaddingRight = (smScreen && !lgScreen && el.style?.tabletPaddingRight) || el.style?.paddingRight;
        const mobileWidth = !smScreen && el.style?.mobileWidth;
        const tabletWidth = (smScreen && !lgScreen && el.style?.tabletWidth) || el.style?.width;
        return (
            <div
                key={el.colName}
                className={classNames('t-inter-semi-bold', style.cell, style.headerCell, {
                    [style.borderHeader]: isHiddenBorderBottom,
                })}
                style={{
                    cursor: el.sortBy && !isLoading ? 'pointer' : null,
                    top: !hidePagination ? '68px' : '0',
                    paddingTop: '0',
                    paddingRight: mobilePaddingRight || tabletPaddingRight,
                    paddingLeft: i === 0 ? '16px' : el.style?.paddingLeft,
                    borderTop: !showPagination ? 'none' : el?.style?.borderTop,
                    ...el.headerCellWrapperStyle,
                }}
            >
                <div
                    className={classNames('t-inter-semi-bold', style.headerCellContent, style.headerCellCapitalize, {
                        [style.headerCellNoTransform]:
                            typeof el?.headerText === 'string' && el?.headerText?.includes('zkApp'),
                    })}
                    style={{
                        minWidth: el.style?.minWidth,
                        flexGrow: el.style?.flexGrow,
                        maxWidth: el.style?.maxWidth,
                        width: mobileWidth || tabletWidth,
                        ...el.headerCellStyle,
                        color: 'rgba(0,0,0,0.8)',
                    }}
                >
                    <span onClick={el.sortBy ? () => sortClickHandler(el.sortBy, el.initialOrder) : null}>
                        {el.headerText ?? ''}
                    </span>
                    {el.sortBy && el.sortBy === sortBy && (
                        <Image
                            src={SortIcon}
                            alt=""
                            style={{ transform: orderBy === ORDER_BY.ASC ? 'rotateX(180deg)' : null }}
                        />
                    )}
                </div>
            </div>
        );
    });
};

export default TableHeader;

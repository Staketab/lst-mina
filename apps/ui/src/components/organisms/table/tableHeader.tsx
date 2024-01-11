import React from 'react';
import styles from './Table.module.css';
import classNames from 'classnames';
import SortIcon from './img/SortIcon.svg';
import Image from 'next/image';
import { ORDER_BY, TableConfig } from '../../../comman/types';

type TableHeaderProps = {
    config: TableConfig[];
    hidePagination: boolean;
    isLoading: boolean;
    sortBy: string;
    orderBy: string;
    onSortChange: (value: string) => void;
    onOrderChange: (value?: string) => void;
    isHiddenBorderBottom: boolean;
};

const TableHeader = ({
    config,
    hidePagination,
    isLoading,
    sortBy: sortByProps,
    orderBy,
    onSortChange,
    onOrderChange,
    isHiddenBorderBottom,
}: TableHeaderProps): JSX.Element => {
    const handleSort = (sortName) => {
        if (isLoading && !sortName) return;
        if (sortName === sortByProps) {
            return onOrderChange(orderBy === ORDER_BY.DESC ? ORDER_BY.ASC : ORDER_BY.DESC);
        }
        onSortChange(sortName);
        onOrderChange(undefined);
    };

    return (
        <>
            {config.map(({ colName, style, headerText, sortBy }) => {
                const tabletWidth = style?.width;
                return (
                    <div
                        key={colName}
                        className={classNames('t-inter-semi-bold', styles.cell, styles.headerCell, {
                            [styles.borderHeader]: isHiddenBorderBottom,
                        })}
                        style={{
                            cursor: sortBy && !isLoading ? 'pointer' : null,
                            top: !hidePagination ? '68px' : '0',
                            paddingLeft: '16px',
                        }}
                    >
                        <div
                            className={classNames(
                                't-inter-semi-bold',
                                styles.headerCellContent,
                                styles.headerCellCapitalize
                            )}
                            style={{
                                minWidth: style?.minWidth,
                                maxWidth: style?.maxWidth,
                                width: tabletWidth,
                            }}
                        >
                            <span onClick={() => handleSort(sortBy)}>{headerText}</span>
                            {sortBy && sortBy === sortByProps && (
                                <Image
                                    src={SortIcon}
                                    alt=""
                                    style={{ transform: orderBy === ORDER_BY.ASC ? 'rotateX(180deg)' : null }}
                                />
                            )}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default TableHeader;

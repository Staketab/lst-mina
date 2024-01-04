import React from 'react';
import style from './Table.module.css';
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
    sortBy,
    orderBy,
    onSortChange,
    onOrderChange,
    isHiddenBorderBottom,
}: TableHeaderProps): JSX.Element => {
    const sortClickHandler = (sortName) => {
        if (isLoading) return;
        if (sortName === sortBy) {
            return onOrderChange(orderBy === ORDER_BY.DESC ? ORDER_BY.ASC : ORDER_BY.DESC);
        }
        onSortChange(sortName);
        onOrderChange(undefined);
    };

    return (
        <>
            {config.map((el) => {
                const tabletWidth = el.style?.width;
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
                            paddingLeft: '16px',
                        }}
                    >
                        <div
                            className={classNames(
                                't-inter-semi-bold',
                                style.headerCellContent,
                                style.headerCellCapitalize,
                                {
                                    [style.headerCellNoTransform]:
                                        typeof el?.headerText === 'string' && el?.headerText?.includes('zkApp'),
                                }
                            )}
                            style={{
                                minWidth: el.style?.minWidth,
                                maxWidth: el.style?.maxWidth,
                                width: tabletWidth,
                                color: 'rgba(0,0,0,0.8)',
                            }}
                        >
                            <span onClick={el.sortBy ? () => sortClickHandler(el.sortBy) : null}>
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
            })}
        </>
    );
};

export default TableHeader;

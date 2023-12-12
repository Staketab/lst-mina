import React from 'react';
import style from './Pagination.module.css';
import classNames from 'classnames';
import { formatNum } from '../../../comman/helpers';
import Pager from '../pager';
import SingleSelect from '../singleSelect';

type PaginationProps = {
    currentPage: number;
    pageLimit: number;
    totalElements: number;
    totalCount: number;
    offset?: number;
    className?: string;
    type?: string;
    customShowingText?: string;
    showTotalElements?: boolean;
    pagesCount: number;
    isLoading: boolean;
    limitOptions: any[];
    onPageChange: (value: number | string) => void;
    onLimitChange: (value: number) => void;
};

const Pagination = ({
    currentPage,
    pageLimit,
    totalElements,
    offset,
    className,
    totalCount,
    type,
    customShowingText,
    showTotalElements = false,
    pagesCount,
    isLoading,
    onPageChange,
    onLimitChange,
    limitOptions,
}: PaginationProps) => {
    const nextOffset = pageLimit * (currentPage + 1);

    return (
        <div
            className={classNames(style.pagination, className, {
                [style.paginationMobileWithShowing]: showTotalElements,
            })}
        >
            <div
                className={classNames(style.showing, {
                    [style.showingHiddenOnMobile]: !showTotalElements,
                    [style.showingMobile]: showTotalElements,
                })}
            >
                {totalCount && totalElements ? (
                    <>
                        <p className={style.totalCount}>
                            {formatNum(totalCount)} {type} found
                        </p>
                        <p className={style.showingLast}>
                            {customShowingText || 'Showing last'} {formatNum(totalElements)}
                        </p>
                    </>
                ) : (
                    <p>
                        Showing {offset + 1} - {nextOffset > totalElements ? totalElements : nextOffset} out of{' '}
                        {totalElements ?? '...'}
                    </p>
                )}
            </div>

            <div className={style.pager}>
                <Pager page={currentPage + 1} count={pagesCount} onChange={(page) => onPageChange(page)} />
            </div>
            <div className={style.select}>
                <span>Show</span>
                <SingleSelect
                    options={
                        limitOptions ?? [
                            { text: '50', value: 50 },
                            { text: '100', value: 100 },
                            { text: '200', value: 200 },
                        ]
                    }
                    initValue={pageLimit}
                    onChange={onLimitChange}
                    disable={isLoading}
                    notActive
                    minWidth="100%"
                    btnHeight="32px"
                />
            </div>
        </div>
    );
};

export default Pagination;

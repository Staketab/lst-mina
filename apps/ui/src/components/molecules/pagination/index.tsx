import React from 'react';
import style from './Pagination.module.css';
import Pager from '../pager';
import SingleSelect from '../singleSelect';
import { LimitOptions } from '../../../comman/types';

type PaginationProps = {
    currentPage: number;
    pagesCount: number;
    pageLimit: number;
    totalElements: number;
    onPageChange: (value: number | string) => void;
    onLimitChange: (value: number) => void;
    isLoading: boolean;
    offset?: number;
    limitOptions?: LimitOptions;
};

const Pagination = ({
    currentPage,
    pageLimit,
    totalElements,
    offset,
    pagesCount,
    isLoading,
    limitOptions,
    onPageChange,
    onLimitChange,
}: PaginationProps) => {
    const nextOffset = pageLimit * (currentPage + 1);

    return (
        <div className={style.pagination}>
            <div className={style.showing}>
                <p>
                    Showing {offset + 1} - {nextOffset > totalElements ? totalElements : nextOffset} out of{' '}
                    {totalElements ?? '...'}
                </p>
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

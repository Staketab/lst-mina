import React from 'react';
import style from './Pagination.module.css';
import Pager from '../pager';
import { LimitOptions } from '../../../comman/types';
import { SingleSelect } from '../singleSelect';

type PaginationProps = {
    currentPage: number;
    pagesCount: number;
    pageLimit: number;
    totalElements: number;
    onChangePage: (value: number | string) => void;
    onChangeLimit: (value: number) => void;
    isLoading: boolean;
    offset?: number;
    limitOptions?: LimitOptions;
};

const initLimitOptions = [
    { text: '50', value: 50 },
    { text: '100', value: 100 },
    { text: '200', value: 200 },
];
const Pagination = ({
    currentPage,
    pageLimit,
    totalElements,
    offset,
    pagesCount,
    isLoading,
    limitOptions,
    onChangePage,
    onChangeLimit,
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
                <Pager page={currentPage + 1} count={pagesCount} onChange={(page) => onChangePage(page)} />
            </div>
            <div className={style.select}>
                <span>Show</span>
                <SingleSelect
                    options={limitOptions ?? initLimitOptions}
                    initValue={pageLimit}
                    onChange={onChangeLimit}
                    disable={isLoading}
                />
            </div>
        </div>
    );
};

export default Pagination;

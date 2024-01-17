import React from 'react';
import style from './index.module.css';
import { LimitOptions } from '../../../comman/types';
import Pager from '../pager';
import { SingleSelect } from '../singleSelect';

type PaginationProps = {
    currentPage: number;
    pagesCount: number;
    pageLimit: number;
    totalElements: number;
    onChangePage: (value: number | string) => void;
    onChangeLimit: (value: number) => void;
    isLoading: boolean;
    limitOptions?: LimitOptions;
};

const Pagination = ({
    currentPage,
    pageLimit,
    totalElements,
    pagesCount,
    onChangePage,
    limitOptions,
    onChangeLimit,
    isLoading,
}: PaginationProps): JSX.Element => {
    const nextOffset = pageLimit * (currentPage + 1);
    const offset = pageLimit * currentPage;

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
                    options={limitOptions}
                    initValue={pageLimit}
                    onChange={onChangeLimit}
                    disable={isLoading}
                />
            </div>
        </div>
    );
};

export default Pagination;

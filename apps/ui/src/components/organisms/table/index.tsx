import React, { useEffect, useRef } from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import style from './Table.module.css';
import classNames from 'classnames';
import Pagination from '../../molecules/pagination';
import { TableErrorMessage } from '../../atoms/tableErrorMessage';
import { DataTable, LimitOptions, TableConfig } from '../../../comman/types';
import { Loader, LoaderVariant } from '../../atoms/loader';

type TableProps = {
    data: DataTable[];
    config: TableConfig[];
    isLoading: boolean;
    currentPage: number;
    pageLimit: number;
    sortBy: string;
    orderBy: string;
    totalElements: number;
    pagesCount: number;
    limitOptions?: LimitOptions;
    onChangePage: (value: number) => void;
    onChangeLimit: (value: number) => void;
    onChangeSort?: (value: string) => void;
    onChangeOrder?: (value: string) => void;
};

const Table = ({
    data,
    config,
    isLoading,
    // pagination props
    currentPage = 0,
    pagesCount = 1,
    pageLimit = 50,
    totalElements = data?.length ?? 0,
    limitOptions,
    onChangePage,
    onChangeLimit,
    sortBy,
    orderBy,
    onChangeSort,
    onChangeOrder,
}: TableProps): JSX.Element => {
    const wrapperRef = useRef(null);

    useEffect(() => {
        wrapperRef.current?.scrollTo({
            left: 0,
            behavior: 'smooth',
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wrapperRef.current, isLoading]);

    const offset = pageLimit * currentPage;

    const generateTemplateColumn = (config) =>
        config.map((el) => el?.style?.outerWidth ?? (el?.style?.noGrow ? 'auto' : '1fr')).join(' ');

    const showErrorMessage = !isLoading && (!data || data?.length < 1 || !Object.values(data)?.length);

    const renderPagination = () => {
        return (
            <Pagination
                currentPage={currentPage}
                pagesCount={pagesCount}
                pageLimit={pageLimit}
                totalElements={totalElements}
                onChangePage={onChangePage}
                onChangeLimit={onChangeLimit}
                isLoading={isLoading}
                limitOptions={limitOptions}
                offset={offset}
            />
        );
    };

    return (
        <div
            className={classNames(style.tableComponent, {
                [style.noData]: !isLoading && (!data || data?.length < 1),
            })}
        >
            {config && (
                <>
                    {renderPagination()}
                    <div
                        className={style.table}
                        ref={wrapperRef}
                        style={{ gridTemplateColumns: generateTemplateColumn(config) }}
                    >
                        <TableHeader
                            config={config}
                            hidePagination
                            isLoading={isLoading}
                            sortBy={sortBy}
                            orderBy={orderBy}
                            onSortChange={onChangeSort}
                            onOrderChange={onChangeOrder}
                            isHiddenBorderBottom={showErrorMessage}
                        />
                        {!isLoading && <TableBody data={data} config={config} currentPage={currentPage} />}
                    </div>
                    {isLoading && (
                        <div className={style.loadingScreen}>
                            <Loader variant={LoaderVariant.CIRCLE} />
                        </div>
                    )}
                    {showErrorMessage && <TableErrorMessage />}
                    {!isLoading && renderPagination()}
                </>
            )}
        </div>
    );
};

export default Table;

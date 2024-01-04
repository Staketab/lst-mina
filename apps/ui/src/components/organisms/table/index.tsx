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
    onPageChange: (value: number) => void;
    onLimitChange: (value: number) => void;
    onSortChange?: (value: string) => void;
    onOrderChange?: (value: string) => void;
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
    onPageChange,
    onLimitChange,
    sortBy,
    orderBy,
    onSortChange,
    onOrderChange,
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
                onPageChange={onPageChange}
                onLimitChange={onLimitChange}
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
                    <div>
                        <div
                            className={style.table}
                            ref={wrapperRef}
                            style={{ gridTemplateColumns: generateTemplateColumn(config) }}
                        >
                            {
                                <TableHeader
                                    config={config}
                                    hidePagination
                                    isLoading={isLoading}
                                    sortBy={sortBy}
                                    orderBy={orderBy}
                                    onSortChange={onSortChange}
                                    onOrderChange={onOrderChange}
                                    isHiddenBorderBottom={showErrorMessage}
                                />
                            }
                            {!isLoading && <TableBody data={data} config={config} currentPage={currentPage} />}
                        </div>
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

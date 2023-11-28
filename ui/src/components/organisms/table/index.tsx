import React, { useEffect, useRef, useState } from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import style from './Table.module.css';
import classNames from 'classnames';
import Pagination from '../../molecules/pagination';
import { useIsFullyScrolled } from '../../../hooks';
import { TableErrorMessage } from '../../atoms/tableErrorMessage';
import { LimitOptions, TableConfig } from '../../../comman/types';
import loader from '../../../../public/assets/loader.gif';
import Image from 'next/image';

type TableProps = {
    data: any[];
    config: TableConfig[];
    isLoading: boolean;
    currentPage: number;
    pagesCount: number;
    pageLimit: number;
    totalElements: number;
    onPageChange: (value: number) => void;
    onLimitChange: (value: number) => void;
    customShowingText?: string;
    sortBy: string;
    orderBy: string;
    initialOrderBy?: string;
    onSortChange?: (value: string) => void;
    onOrderChange?: (value: string) => void;

    onRowClick?: () => void;
    activeRowIndex?: number;
    limitOptions?: LimitOptions;
    hidePagination?: boolean;
    classnames?: string;
    needPagination?: boolean;
    hideTopPagination?: boolean;
    noPadding?: boolean;
    noFullMobileWidth?: boolean;
    onClearStr?: () => void;
    registerUrl?: string;
    noFade?: boolean;
    totalCount?: number;
    type?: string;
    filtersChild?: string;
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
    onPageChange,
    onLimitChange,
    customShowingText,
    sortBy,
    orderBy,
    initialOrderBy,
    onSortChange,
    onOrderChange,
    onRowClick,
    activeRowIndex,
    limitOptions,
    hidePagination,
    classnames,
    hideTopPagination,
    noPadding,
    noFullMobileWidth = false,
    onClearStr,
    registerUrl,
    noFade,
    totalCount,
    type,
    // render props
    filtersChild = null,
}: TableProps) => {
    const [elements, setElements] = useState(totalElements);

    useEffect(() => {
        setElements(totalElements);
    }, [totalElements]);

    const wrapperRef = useRef(null);
    const { fullyScrolled, isScrolled } = useIsFullyScrolled(wrapperRef);

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

    const showPagination = totalElements > (limitOptions?.length > 0 ? limitOptions[0]?.value ?? 50 : 50);

    const showErrorMessage = !isLoading && (!data || data?.length < 1 || !Object.values(data)?.length);

    return (
        <div
            className={classNames(style.tableComponent, classnames, {
                [style.noData]: !isLoading && (!data || data?.length < 1),
                [style.noDataNoPagination]:
                    (elements <= 20 || hidePagination) && !isLoading && (!data || data?.length < 1),
                'full-mobile-width': !noFullMobileWidth,
            })}
        >
            {filtersChild ? <div className={style.tableFiltersContainer}>{filtersChild}</div> : null}
            {config && (
                <>
                    {!hidePagination && !hideTopPagination && (
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
                            totalCount={totalCount}
                            type={type}
                            customShowingText={customShowingText}
                        />
                    )}
                    <div
                        className={classNames(style.wrapper, {
                            [style.wrapperNoFade]: !isScrolled || fullyScrolled || noFade,
                            [style.noPagination]: !noPadding && (elements <= 20 || isLoading || hidePagination),
                        })}
                    >
                        <div
                            className={style.table}
                            ref={wrapperRef}
                            style={{ gridTemplateColumns: generateTemplateColumn(config) }}
                        >
                            <TableHeader
                                config={config}
                                hidePagination
                                showPagination={showPagination}
                                isLoading={isLoading}
                                sortBy={sortBy}
                                orderBy={orderBy}
                                initialOrderBy={initialOrderBy}
                                onSortChange={onSortChange}
                                onOrderChange={onOrderChange}
                                isHiddenBorderBottom={showErrorMessage}
                            />
                            {!isLoading && (
                                <TableBody
                                    data={data}
                                    config={config}
                                    currentPage={currentPage}
                                    onRowClick={onRowClick}
                                    activeRowIndex={activeRowIndex}
                                />
                            )}
                        </div>
                    </div>
                    {isLoading && (
                        <div className={style.loadingScreen}>
                            <Image
                                src={loader}
                                alt="preloader"
                                style={{ width: '42px', height: '32px' }}
                                width={32}
                                height={32}
                            />
                        </div>
                    )}
                    {showErrorMessage && <TableErrorMessage onClearStr={onClearStr} registerUrl={registerUrl} />}
                    {showPagination && !hidePagination && (
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
                            totalCount={totalCount}
                            type={type}
                            customShowingText={customShowingText}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default Table;

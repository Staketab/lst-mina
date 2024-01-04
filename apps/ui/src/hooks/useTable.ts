import { useEffect, useState } from 'react';

type UseTableProps = {
    defaultState: {
        limit: number;
        sortBy: string;
        orderBy: string;
    };
};

type UseTableresult = {
    limit: number;
    sortBy: string;
    orderBy: string;
    page: number;
    searchStr: string;
    resetFilter: () => void;
    isInitState: boolean;
    isSearchStrEmpty: boolean;
    actions: {
        setSortBy: (value: string) => void;
        setLimit: (value: number) => void;
        setOrderBy: (value: string) => void;
        setPage: (value: number) => void;
        setSearchStr: (value: string) => void;
    };
};

export const useTable = ({ defaultState }: UseTableProps): UseTableresult => {
    let url;
    if (typeof window !== 'undefined') {
        url = window?.location.href;
    }
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(defaultState.limit);
    const [sortBy, setSortBy] = useState<string>(defaultState.sortBy);
    const [orderBy, setOrderBy] = useState<string>(defaultState.orderBy);
    const [searchStr, setSearchStr] = useState<string>('');

    const isInitState =
        defaultState.limit === limit && defaultState.sortBy === sortBy && defaultState.orderBy === orderBy;

    const isSearchStrEmpty = searchStr === '';

    useEffect(() => {
        setPage(0);
    }, [limit, orderBy, searchStr, sortBy, url]);

    useEffect(() => {
        setLimit(defaultState?.limit);
        setSortBy(defaultState?.sortBy);
        setOrderBy(defaultState?.orderBy);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    const resetFilter = () => {
        setSearchStr('');
        setLimit(defaultState?.limit);
        setSortBy(defaultState?.sortBy);
        setOrderBy(defaultState?.orderBy);
        setPage(0);
    };

    return {
        limit,
        sortBy,
        orderBy,
        page,
        searchStr,
        resetFilter,
        isInitState,
        isSearchStrEmpty,
        actions: {
            setSortBy,
            setLimit,
            setOrderBy,
            setPage,
            setSearchStr,
        },
    };
};

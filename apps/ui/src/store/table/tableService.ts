import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PUBLIC_APP_BASE_URL } from '../../comman/constants';

export const tableService = createApi({
    reducerPath: 'tableService',
    baseQuery: fetchBaseQuery({
        baseUrl: PUBLIC_APP_BASE_URL,
        fetchFn: fetch,
    }),
    keepUnusedDataFor: 1,
    endpoints: (builder) => ({
        getTableData: builder.query({
            query: ({ page, size, orderBy, sortBy, searchStr, url }) => {
                return {
                    url: url,
                    method: 'GET',
                    params: {
                        size: size,
                        orderBy: orderBy,
                        sortBy: sortBy,
                        searchStr: searchStr,
                        page,
                        limit: size,
                    },
                };
            },
        }),
    }),
});

export const { getTableData } = tableService.endpoints;
export const { useGetTableDataQuery } = tableService;

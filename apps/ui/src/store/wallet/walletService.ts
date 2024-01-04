import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PUBLIC_APP_BASE_URL } from '../../comman/constants';

export const walletService = createApi({
    reducerPath: 'walletService',
    baseQuery: fetchBaseQuery({
        baseUrl: PUBLIC_APP_BASE_URL,
        fetchFn: fetch,
    }),
    endpoints: (builder) => ({
        getWalletBalance: builder.query({
            query: (address) => {
                return {
                    url: `/qanet/api//api/core/accounts/${address}/balance`,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const { getWalletBalance } = walletService.endpoints;
export const { useGetWalletBalanceQuery } = walletService;

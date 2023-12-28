import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chainService = createApi({
    reducerPath: 'chainService',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080',
        fetchFn: fetch,
    }),
    endpoints: (builder) => ({
        loadBlock: builder.mutation({
            query: () => ({
                url: '/graphql',
                method: 'POST',
                body: {
                    query: `
                      query GetBlock {
                        block {
                          txs {
                            tx {
                              argsFields
                              argsJSON
                              methodId
                              nonce
                              sender
                              signature {
                                r
                                s
                              }
                            }
                            status
                            statusMessage
                          }
                        }
                        network {
                          block {
                            height
                          }
                        }
                      }
                    `,
                },
            }),
        }),
    }),
});

export const { loadBlock } = chainService.endpoints;
export const { useLoadBlockMutation } = chainService;

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { tableService } from './table/tableService';
import { walletService } from './wallet/walletService';
import { chainService } from './chain/chainService';
import tableReducer from './table/tableSlice';
import walletReducer from './wallet/walletSlice';
import clientReducer from './client/clientSlice';
import balancesReducer from './balances/balancesSlice';
import chainReducer from './chain/chainSlice';
import contractReducer from './contract/contractSlice';

export const rootReducer = combineReducers({
    table: tableReducer,
    wallet: walletReducer,
    client: clientReducer,
    balances: balancesReducer,
    chain: chainReducer,
    contract: contractReducer,
    [tableService.reducerPath]: tableService.reducer,
    [walletService.reducerPath]: walletService.reducer,
    [chainService.reducerPath]: chainService.reducer,
});

export const createStore = (_initialValue = {}) => {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState: { ..._initialValue },
        //@ts-ignore
        middleware: (getDefaultMiddleware) => {
            const middlewares = [tableService.middleware, walletService.middleware, chainService.middleware];
            return getDefaultMiddleware({
                thunk: true,
                serializableCheck: false,
                immutableCheck: false,
            }).concat(middlewares);
        },
        devTools: true,
    });

    return store;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

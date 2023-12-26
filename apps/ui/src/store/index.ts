import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { tableService } from './table/tableService';
import { walletService } from './wallet/walletService';
import tableReducer from './table/tableSlice';
import walletreducer from './wallet/walletSlice';
import clientReducer from './client/clientSlice';
import balancesReducer from './balances/balancesSlice';

export const rootReducer = combineReducers({
    table: tableReducer,
    wallet: walletreducer,
    client: clientReducer,
    balances: balancesReducer,
    [tableService.reducerPath]: tableService.reducer,
    [walletService.reducerPath]: walletService.reducer,
});

export const createStore = (_initialValue = {}) => {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState: { ..._initialValue },
        //@ts-ignore
        middleware: (getDefaultMiddleware) => {
            const middlewares = [tableService.middleware, walletService.middleware];
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

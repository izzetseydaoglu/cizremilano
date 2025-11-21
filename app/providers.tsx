'use client';

import { ReactNode, useRef } from 'react';

import { Alert } from '@sydsoft/base';
import { Provider } from 'react-redux';
import { store as createStore } from '@/_redux';

type ReduxProviderProps = { children: ReactNode };

export function ReduxProvider({ children }: ReduxProviderProps) {
    const storeRef = useRef<ReturnType<typeof createStore> | null>(null);

    if (storeRef.current === null) {
        storeRef.current = createStore();
    }

    const store = storeRef.current;

    return store ? (
        <Provider store={store}>
            {children}
            <Alert defaultSuccessTimer={'5000'} defaultTimer={'10000'} defaultErrorTimer={'10000'} />
        </Provider>
    ) : null;
}

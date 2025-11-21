import { siteSlice } from '@/_redux/site';
import { configureStore } from '@reduxjs/toolkit';

export let storeClone: any = null;

export const store = () => {
    const create = configureStore({
        reducer: {
            [siteSlice.name]: siteSlice.reducer
        },
        devTools: process.env.NODE_ENV !== 'production'
    });
    storeClone = create;
    return create;
};

/**
 * Copyright (c) 2024
 *  @author: izzetseydaoglu
 *  @last-modified: 8.04.2024 01:35
 */

import {configureStore} from '@reduxjs/toolkit';
import {createWrapper} from 'next-redux-wrapper';
import {siteSlice} from "./site";


export let storeClone: any = null;

export const wrapper = createWrapper(() => {
    const create = configureStore({
        reducer: {
            [siteSlice.name]: siteSlice.reducer,
        },
        devTools: process.env.NODE_ENV !== 'production'
    });
    storeClone = create;
    return create;
});


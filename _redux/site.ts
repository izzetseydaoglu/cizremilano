/**
 * Copyright (c) 2024
 *  @author: izzetseydaoglu
 *  @last-modified: 8.04.2024 01:35
 */


import {createSlice} from '@reduxjs/toolkit';
import {useSelector} from "react-redux";
import {HYDRATE} from "next-redux-wrapper";
import {storeClone} from "@/_redux/index";

type typeProps = {
    title: string,
    description: string,
    acikSayfa?: "yiyecekler" | "icecekler" | null,
    [key: string | number]: any
}

const initialState: typeProps = {
    title: "DavaSis",
    description: "DavaSis - Hukuk Büroları Yazılımı",
    acikSayfa: null
}

export const siteSlice = createSlice({
    name: 'site',
    initialState,
    reducers: {
        actionUpdateSite: (state, action) => {
            return {...state, ...action.payload};
        },
        actionUpdateAcikSayfa: (state, action) => {
            return {...state, acikSayfa: action.payload};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action: any) => {
            if (action.payload.site.hydrate) {
                let newState = {...action.payload.site};
                delete newState.hydrate;
                return {
                    ...state,
                    ...newState
                };
            }
            return state;
        });
    }
});

export const {actionUpdateSite,actionUpdateAcikSayfa} = siteSlice.actions;
export const useSite = (): typeProps => useSelector((state: any) => state.site);
export default siteSlice.reducer;


export const actionSetAcikSayfa = (page: string|null) => {
    storeClone.dispatch(actionUpdateAcikSayfa(page));
};
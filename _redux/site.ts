import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { storeClone } from '.';

export type typeReduxSiteProps = {
    devKey: string;
    title: string;
    description: string;
    acikSayfa?: 'kategoriler' | 'yazboz' | 'contact'  | null;
    acikKategori?: { id: string | number; title: string } | null;
    anaKategoriler: Array<{ id: string | number; baslik: string; icon: string; sira: number }>;
    config: {
        baslik: string;
        logo: string;
        adres: string;
        telefon: string;
        email: string;
        instagram: string;
        facebook: string;
        twitter: string;
        youtube: string;
        tiktok: string;
        fiyatgoster: string;
        stokgoster: string;
    };
};

const initialState: typeReduxSiteProps = {
    devKey: '',
    title: 'sydSOFT Bilişim Hizmetleri',
    description: 'QR Menu',
    anaKategoriler: [],
    acikSayfa: null,
    acikKategori: null,
    config: {
        baslik: 'sydSOFT Bilişim Hizmetleri',
        logo: '',
        adres: '',
        telefon: '',
        email: '',
        instagram: '',
        facebook: '',
        twitter: '',
        youtube: '',
        tiktok: '',
        fiyatgoster: '1',
        stokgoster: '1'
    }
};

export const siteSlice = createSlice({
    name: 'site',
    initialState,
    reducers: {
        actionUpdateSite: (state, action) => ({ ...state, ...action.payload })
    }
});

export const { actionUpdateSite } = siteSlice.actions;
export const useSite = (): typeReduxSiteProps => useSelector((state: any) => state.site);
export default siteSlice.reducer;

export const actionSetAcikSayfa = (page: string | null) =>
    storeClone.dispatch(
        actionUpdateSite({
            acikSayfa: page,
            acikKategori: page === null ? null : storeClone.getState().site.acikKategori
        })
    );

export const actionSetConfig = (config: any) => storeClone.dispatch(actionUpdateSite({ config }));
export const actionSetAnaKategoriler = (list: any[]) => storeClone.dispatch(actionUpdateSite({ anaKategoriler: list }));

export const actionSetKategori = (katID: any, katTitle?: string) => {
    if (katID) {
        storeClone.dispatch(
            actionUpdateSite({
                acikSayfa: 'kategoriler',
                acikKategori: {
                    id: katID,
                    title: katTitle
                }
            })
        );
    } else {
        storeClone.dispatch(
            actionUpdateSite({
                acikSayfa: null,
                acikKategori: null
            })
        );
    }
};

export const getDevKey = (): string | null => storeClone.getState().site.devKey ?? null;

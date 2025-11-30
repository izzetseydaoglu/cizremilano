'use client';

import { alert_add, alert_remove } from '@sydsoft/base';
import { useCallback, useEffect, useState } from 'react';

import AdminContainer from './comps/container';
import AltKategoriler from './comps/AltKategoriler';
import Kategoriler from './comps/Kategoriler';
import { adminApiList } from '@/_lib/_apiList';
import { sydGet } from '@/_lib/sPostGet';

export default function AdminPanel() {
    const [kategoriler, setKategoriler] = useState<any[]>([]);

    const [altKategoriler, setAltKategoriler] = useState<string | null>(null);

    const listKategori = useCallback(async () => {
        const loadingAlert = alert_add({ type: 'loading', message: 'Kategoriler yükleniyor...' });
        sydGet({ target: adminApiList.setup })
            .then((result: any) => {
                if (result?.kategoriler) {
                    setKategoriler(result.kategoriler);
                }
            })
            .catch(() => {
                alert_add({ type: 'error', message: 'Veriler alınırken hata oluştu...' });
            })
            .finally(() => {
                alert_remove(loadingAlert);
            });
    }, []);

    useEffect(() => {
        listKategori();
    }, [listKategori]);

    return (
        <AdminContainer>
            {<Kategoriler kategoriler={kategoriler} refreshKategoriler={listKategori} setAltKategoriler={setAltKategoriler} />}
            {altKategoriler && <AltKategoriler kategoriler={kategoriler} katid={altKategoriler} refreshKategoriler={listKategori} setAltKategoriler={setAltKategoriler} />}
        </AdminContainer>
    );
}

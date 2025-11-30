'use client';

import { Box, BoxContent, BoxHeader, Button, alert_add, alert_remove } from '@sydsoft/base';
import { sydGet, sydPost } from '@/_lib/sPostGet';
import { useCallback, useEffect, useState } from 'react';

import AdminContainer from '../comps/container';
import { ModalUrunEkleDuzenle } from '../comps/ModalUrunEkleDuzenle';
import { STable } from '../comps/shared';
import { adminApiList } from '@/_lib/_apiList';
import { buildImagePath } from '@/_lib/_inc';

export default function AdminPanel() {
    const [kategoriler, setKategoriler] = useState<any[]>([]);
    const [urunler, setUrunler] = useState<any[]>([]);

    const [modal, setModal] = useState<string | null>(null);

    const listUrunler = useCallback(async () => {
        const loadingAlert = alert_add({ type: 'loading', message: 'Ürünler yükleniyor...' });
        sydGet({ target: adminApiList.setup })
            .then((result: any) => {
                if (result?.urunler) {
                    setUrunler(result.urunler);
                }
                if (result?.kategoriler) {
                    const newList: any[] = [];
                    result.kategoriler.forEach((kat: any) => {
                        newList.push({
                            id: kat.id,
                            baslik: kat.baslik
                        });
                        if (Array.isArray(kat.altkategoriler)) {
                            kat.altkategoriler.forEach((altkat: any) => {
                                newList.push({
                                    id: altkat.id,
                                    baslik: `${kat.baslik} > ${altkat.baslik}`
                                });
                            });
                        }
                    });
                    setKategoriler(newList);
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
        listUrunler();
    }, [listUrunler]);

    const deleteUrun = (id: string | number) => {
        const loading = alert_add({ type: 'loading', message: 'Lütfen bekleyiniz..', timer: false });
        sydPost({
            target: adminApiList.urunsil,
            data: { id }
        }).then((result: any) => {
            if (result?.success) {
                listUrunler();
            }
            alert_remove(loading);
        });
    };
    return (
        <AdminContainer>
            <Box>
                <BoxHeader
                    title="Ürünler"
                    menu={
                        <Button className="adminbtn" onClick={() => setModal('0')}>
                            Yeni Ekle
                        </Button>
                    }
                />
                <BoxContent>
                    <STable>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Resim</th>
                                <th>Kategori</th>
                                <th style={{ width: '50%' }}>Başlık</th>
                                <th>Fiyat</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {urunler.map((urun) => (
                                <tr key={urun.id}>
                                    <td>{urun.id}</td>
                                    <td>{urun.resim !== '' && <img src={buildImagePath(urun.resim)} alt={urun.baslik} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />}</td>
                                    <td>{kategoriler.find((kat) => kat.id === urun.ustid)?.baslik || 'Kategori Yok'}</td>
                                    <td>{urun.baslik}</td>
                                    <td className="tablemenu">{urun.fiyat} TL</td>
                                    <td className="tablemenu">
                                        <Button buttonSize="small" buttonClass="primary" onClick={() => setModal(urun.id)}>
                                            Düzenle
                                        </Button>
                                        <Button
                                            buttonSize="small"
                                            buttonClass="danger"
                                            onClick={() => deleteUrun(urun.id)}
                                            dialog={{
                                                message: 'Ürünü tamamen silmek istediğinize emin misiniz?'
                                            }}
                                        >
                                            Sil
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </STable>
                </BoxContent>
            </Box>
            {modal && <ModalUrunEkleDuzenle onClose={() => setModal(null)} kategoriler={kategoriler} urunler={urunler} id={modal} refresh={listUrunler} />}
        </AdminContainer>
    );
}

import { Box, BoxContent, BoxFooter, BoxHeader, Button, Form, FormOlustur, Icon, Input, Modal, PropsFormOgeler, alert_add, alert_remove } from '@sydsoft/base';
import { useEffect, useState } from 'react';

import { STable } from './shared';
import { adminApiList } from '@/_lib/_apiList';
import { sydPost } from '@/_lib/sPostGet';

type Props = {
    kategoriler: any[];
    katid: string;
    refreshKategoriler: () => void;
    setAltKategoriler: (value: string | null) => void;
};

export default function AltKategoriler({ kategoriler, katid, refreshKategoriler, setAltKategoriler }: Props) {
    const [title, setTitle] = useState<string>('Alt Kategoriler');
    const [modal, setModal] = useState<string | null>(null);
    const [list, setList] = useState<any[]>([]);

    useEffect(() => {
        if (katid) {
            const kategori = kategoriler.find((k) => k.id === katid);
            if (kategori) {
                setTitle(kategori.baslik);
                setList(kategori.altkategoriler || []);
            }
        }
    }, [katid, kategoriler]);

    const deleteKategori = (id: string | number) => {
        const loading = alert_add({ type: 'loading', message: 'Lütfen bekleyiniz..', timer: false });
        sydPost({
            target: adminApiList.katsil,
            data: { id }
        }).then((result: any) => {
            if (result?.success) {
                refreshKategoriler();
            }
            alert_remove(loading);
        });
    };
    return (
        <Box>
            <BoxHeader
                title={title}
                menu={
                    <>
                        <Button className="adminbtn" onClick={() => setModal('0')}>
                            Yeni Ekle
                        </Button>
                        <Button onlyIcon={<Icon iconMui="close" />} onClick={() => setAltKategoriler(null)} title="Kapat" />
                    </>
                }
            />
            <BoxContent>
                <STable>
                    <thead>
                        <tr>
                            <th style={{ width: '100%' }}>Başlık</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((kategori) => (
                            <tr key={kategori.id}>
                                <td>{kategori.baslik}</td>
                                <td className="tablemenu">
                                    <Button buttonSize="small" buttonClass="primary" onClick={() => setModal(kategori.id)}>
                                        Düzenle
                                    </Button>
                                    <Button
                                        buttonSize="small"
                                        buttonClass="danger"
                                        onClick={() => deleteKategori(kategori.id)}
                                        dialog={{
                                            message: 'Bu alt kategoriyi tamamen silmek istediğinize emin misiniz?'
                                        }}
                                    >
                                        Sil
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </STable>
                {modal && <ModalKategoriEkleDuzenle onClose={() => setModal(null)} katid={katid} kategoriler={kategoriler} id={modal} refresh={refreshKategoriler} />}
            </BoxContent>
        </Box>
    );
}

export const ModalKategoriEkleDuzenle = ({ kategoriler, id, katid, onClose, refresh }: any) => {
    const [formDisabled, setFormDisabled] = useState<boolean>(true);
    const [form, setForm] = useState<object | any>({});

    useEffect(() => {
        if (id) {
            const kategori = kategoriler.find((k: any) => k.id === katid);
            if (kategori) {
                const altkategori = kategori.altkategoriler.find((k: any) => k.id === id);
                if (altkategori) {
                    setForm({ ...altkategori });
                } else {
                    setForm({ id: '0', ustid: katid, baslik: '' });
                }
            }
        }
    }, [id, katid, kategoriler]);

    const onChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setFormDisabled(false);
    };

    const submit = (e: any) => {
        e.preventDefault();
        const loading = alert_add({ type: 'loading', message: 'Lütfen bekleyiniz..', timer: false });
        setFormDisabled(true);

        sydPost({
            target: adminApiList.katekleduzenle,
            data: form,
            sourceForm: e
        }).then((result: any) => {
            if (result?.success) {
                if (refresh) refresh();
                onClose();
            }

            alert_remove(loading);
            setFormDisabled(false);
        });
    };

    const formOgeler: PropsFormOgeler[] = [
        {
            component: <Input label="Üst Kategori" name="ustid" value={form.ustid || ''} required select={kategoriler.map((kategori: any) => ({ value: kategori.id, label: kategori.baslik }))} />
        },
        {
            component: <Input label="Başlık" name="baslik" type="text" value={form.baslik || ''} required tumuBuyuk />
        }
    ];

    return (
        <Modal open={true} close={onClose} modalStyle={{ width: 500 }}>
            <Form onSubmit={submit}>
                <Box>
                    <BoxHeader>Kategori Ekle / Düzenle</BoxHeader>
                    <BoxContent>
                        <FormOlustur
                            formOgeler={formOgeler}
                            form={form}
                            onChange={onChange}
                            formType={'noLabel'}
                            justifyContent={'flex-start'}
                            sabitGrid={{
                                label: { xs: 11, md: 11 },
                                input: { xs: 11, md: 11 }
                            }}
                            rowSpacing={3}
                        />
                    </BoxContent>
                    <BoxFooter>
                        <Button type="submit" className="adminbtn" disabled={formDisabled}>
                            Kaydet
                        </Button>
                    </BoxFooter>
                </Box>
            </Form>
        </Modal>
    );
};

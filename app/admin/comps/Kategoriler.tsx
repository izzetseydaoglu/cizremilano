import { Box, BoxContent, BoxFooter, BoxHeader, Button, Form, FormOlustur, Icon, Input, Modal, PropsFormOgeler, alert_add, alert_remove } from '@sydsoft/base';
import { useEffect, useState } from 'react';

import { STable } from './shared';
import { adminApiList } from '@/_lib/_apiList';
import { sydPost } from '@/_lib/sPostGet';

type Props = {
    kategoriler: any[];
    refreshKategoriler: () => void;
    setAltKategoriler: (value: string | null) => void;
};
const ICON_OPTIONS = [
    'restaurant',
    'restaurant_menu',
    'local_bar',
    'coffee',
    'ramen_dining',
    'icecream',
    'cake',
    'local_cafe',
    'lunch_dining',
    'kebab_dining',
    'brunch_dining',
    'bakery_dining',
    'local_pizza',
    'emoji_food_beverage',
    'wine_bar',
    'fastfood',
    'smoking_rooms'
];

export default function Kategoriler({ kategoriler, refreshKategoriler, setAltKategoriler }: Props) {
    const [modal, setModal] = useState<string | null>(null);

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
                title="Kategoriler"
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
                            <th>Sıra</th>
                            <th>Icon</th>
                            <th style={{ width: '100%' }}>Başlık</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kategoriler.map((kategori) => (
                            <tr key={kategori.id}>
                                <td>{kategori.sira}</td>
                                <td>
                                    <Icon iconMui={kategori.resim} />
                                </td>
                                <td>{kategori.baslik}</td>
                                <td className="tablemenu">
                                    <Button buttonSize="small" buttonClass="warning" onClick={() => setAltKategoriler(kategori.id)}>
                                        Alt Kategoriler
                                    </Button>
                                    <Button buttonSize="small" buttonClass="primary" onClick={() => setModal(kategori.id)}>
                                        Düzenle
                                    </Button>
                                    <Button
                                        buttonSize="small"
                                        buttonClass="danger"
                                        onClick={() => deleteKategori(kategori.id)}
                                        dialog={{
                                            message: 'Bu kategoriyi tamamen silmek istediğinize emin misiniz?'
                                        }}
                                    >
                                        Sil
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </STable>
                {modal && <ModalKategoriEkleDuzenle onClose={() => setModal(null)} kategoriler={kategoriler} id={modal} refresh={refreshKategoriler} />}
            </BoxContent>
        </Box>
    );
}

export const ModalKategoriEkleDuzenle = ({ onClose, kategoriler, id, refresh }: any) => {
    const [formDisabled, setFormDisabled] = useState<boolean>(true);
    const [form, setForm] = useState<object | any>({});

    useEffect(() => {
        if (id) {
            const kategori = kategoriler.find((k: any) => k.id === id);
            if (kategori) {
                setForm({ ...kategori });
            } else {
                setForm({ id: '0', sira: '', baslik: '', resim: '' });
            }
        }
    }, [id, kategoriler]);

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
            component: (
                <Input
                    label="Sıra"
                    name="sira"
                    value={form.sira || ''}
                    required
                    propsInput={{
                        minLength: 1,
                        maxLength: 3
                    }}
                    sadeceSayi={true}
                />
            ),
            gridInput: { xs: 12, sm: 6, md: 4 }
        },
        {
            component: <Input label="Başlık" name="baslik" type="text" value={form.baslik || ''} required tumuBuyuk />
        },
        {
            component: (
                <Input
                    label="Icon"
                    name="resim"
                    select={ICON_OPTIONS.map((icon) => ({ value: icon, label: icon }))}
                    value={form.resim || ''}
                    ilkSec={false}
                    required
                    startAdornment={form.resim && <Icon iconMui={form.resim} />}
                />
            )
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

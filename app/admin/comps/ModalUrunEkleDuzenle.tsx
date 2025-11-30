'use client';

import { Box, BoxContent, BoxFooter, BoxHeader, Button, Form, FormOlustur, Input, Modal, PropsFormOgeler, UploadBase, alert_add, alert_remove } from "@sydsoft/base";
import { useEffect, useState } from "react";

import { adminApiList } from "@/_lib/_apiList";
import { buildImagePath } from "@/_lib/_inc";
import styled from "styled-components";
import { sydPost } from "@/_lib/sPostGet";

const VARYOK = [
    { value: '0', label: 'YOK' },
    { value: '1', label: 'VAR' }
];

export const ModalUrunEkleDuzenle = ({ onClose, kategoriler, urunler, id, refresh }: any) => {
    const [formDisabled, setFormDisabled] = useState<boolean>(true);
    const [form, setForm] = useState<object | any>({});

    useEffect(() => {
        if (id) {
            const urun = urunler.find((k: any) => k.id === id);
            if (urun) {
                setForm({ ...urun });
            } else {
                setForm({ id: '0', ustid: '', baslik: '', resim: '' });
            }
        }
    }, [id, kategoriler]);

    const onChange = (e: any) => {
        setForm((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
        setFormDisabled(false);
    };

    const submit = (e: any) => {
        e.preventDefault();
        const loading = alert_add({ type: 'loading', message: 'Lütfen bekleyiniz..', timer: false });
        setFormDisabled(true);

        sydPost({
            target: adminApiList.urunekleduzenle,
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
            fullComponent: (
                <ImagePreview>
                    {form.resim !== '' && <img src={buildImagePath(form.resim)} alt="Ürün Resmi" />}
                    <UploadBase
                        required={false}
                        name="yeniresim"
                        ext_ok={['jpg', 'jpeg', 'png', 'gif']}
                        maxSize={2}
                        maxFile={1}
                        // targetForm={setForm}
                        onChange={(e: any) => {
                            if (e && e[0] && e[0].name) {
                                setForm((prev: any) => ({ ...prev, file: e[0] }));
                                setFormDisabled(false);
                            }
                        }}
                    >
                        <Button>{form.resim === '' ? 'Ürün Resmi Ekle' : 'Ürün Resmi Değiştir'}</Button>
                    </UploadBase>
                </ImagePreview>
            )
        },
        {
            component: <Input label="Kategori" name="ustid" select={kategoriler} value={form.ustid || ''} ilkSec={false} required valueKey="id" labelKey="baslik" />
        },
        {
            component: <Input label="Başlık" name="baslik" type="text" value={form.baslik || ''} required tumuBuyuk />
        },
        {
            component: (
                <Input
                    label="Fiyat"
                    name="fiyat"
                    value={form.fiyat || ''}
                    required
                    endAdornment={'TL'}
                    mask="###.00"
                    maskSettings={{
                        clearIfNotMatch: false
                    }}
                />
            ),
            gridInput: { xs: 12, sm: 6, md: 6 }
        },
        {
            component: <Input label="Açıklama" name="aciklama" type="text" value={form.aciklama || ''} required tumuBuyuk multiline rows={6} />
        },
        {
            component: <Input label="Stok" name="stok" select={VARYOK} value={form.stok || ''} required ilkSec={false} />,
            gridInput: { xs: 12, sm: 6, md: 6 }
        },
        {
            component: <Input label="Hazırlama Süresi" name="hazirlamasuresi" value={form.hazirlamasuresi || ''} required endAdornment={'DK'} />,
            gridInput: { xs: 12, sm: 6, md: 6 }
        }
    ];


    return (
        <Modal open={true} close={onClose} modalStyle={{ width: 500 }} hideBackdrop={false}>
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
                                label: { xs: 11, md: 12 },
                                input: { xs: 11, md: 12 }
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

const ImagePreview = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;

    img {
        max-width: 300px;
        max-height: 300px;
        border-radius: 8px;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
        object-fit: cover;
        margin-bottom: 10px;
    }
`;

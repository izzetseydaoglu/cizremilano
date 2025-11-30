'use client';

import { Box, BoxContent, BoxFooter, BoxHeader, Button, Form, FormOlustur, Icon, Input, PropsFormOgeler, alert_add, alert_remove, cerezKaydet, cerezOku, cerezSil, isDev } from '@sydsoft/base';
import { useEffect, useRef, useState } from 'react';

import { adminApiList } from '@/_lib/_apiList';
import { md5HASH } from '@/_lib/sHash';
import { sTokenVerify } from '@/_lib/sToken';
import styled from 'styled-components';
import { sydPost } from '@/_lib/sPostGet';
import { useRouter } from 'next/navigation';

export default function PageLogin() {
    const router = useRouter();
    useEffect(() => {
        const cookieAuth = cerezOku(null, 'auth');
        if (cookieAuth) {
            const data = sTokenVerify(cookieAuth);
            if (data) {
                router.replace('/admin');
            } else {
                cerezSil(null, 'auth');
            }
        }
    }, []);

    const [showpassword, setShowPassword] = useState<boolean>(false);
    const [formDisabled, setFormDisabled] = useState<boolean>(!isDev);
    const [form, setForm] = useState<object | any>({
        email: 'admin@cizremilano.com',
        sifre: ''
    });
    const passwordRef = useRef<any>(null);

    const submit = (e: any) => {
        e.preventDefault();

        const reqList: object[] = [];
        e.target.querySelectorAll('[required]').forEach((req: any) => reqList.push(req.name));

        const loading = alert_add({
            type: 'loading',
            message: 'Lütfen bekleyiniz..',
            timer: false
        });

        setFormDisabled(true);
        sydPost({
            target: adminApiList.giris,
            data: {
                requiredfields: reqList.join(','),
                email: form.email,
                sifre: md5HASH(form.sifre)
            }
        }).then((result: any) => {
            if (result['auth']) {
                cerezKaydet(null, 'auth', result['auth']);
                router.replace('/admin');
            } else {
                passwordRef.current.select();
            }
            alert_remove(loading);
            setFormDisabled(false);
        });
    };

    const onChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setFormDisabled(false);
    };
    const formOgeler: PropsFormOgeler[] = [
        {
            component: (
                <Input
                    label={'E-mail'}
                    name="email"
                    type="email"
                    required={true}
                    placeholder={'E-mail adresinizi giriniz...'}
                    propsInput={{
                        autoComplete: 'username'
                    }}
                />
            )
        },
        {
            component: (
                <Input
                    inputRef={passwordRef}
                    label={'Şifre'}
                    name={'sifre'}
                    value={form['sifre']}
                    onChange={onChange}
                    type={showpassword ? 'text' : 'password'}
                    required={true}
                    placeholder={'Şifrenizi giriniz...'}
                    propsInput={{
                        minLength: 6,
                        autoComplete: 'current-password'
                    }}
                    endAdornment={
                        <Button
                            onlyIcon={<Icon iconMui={showpassword ? 'visibility_off' : 'visibility'} />}
                            onClick={() => {
                                setShowPassword(!showpassword);
                                passwordRef.current.focus();
                            }}
                            tabIndex={-1}
                            style={{ color: '#737373' }}
                        />
                    }
                />
            )
        }
    ];

    return (
        <MainBase>
            <Form onSubmit={submit}>
                <Box className={'form1'}>
                    <BoxHeader component={'h1'} title={'Giriş Yap'} />

                    <BoxContent>
                        <FormOlustur
                            formOgeler={formOgeler}
                            form={form}
                            onChange={onChange}
                            formType={'noLabel'}
                            justifyContent={'center'}
                            sabitGrid={{
                                label: { xs: 9 },
                                input: { xs: 9 }
                            }}
                        />
                    </BoxContent>

                    <BoxFooter align="center">
                        <Button type={'submit'} disabled={formDisabled} buttonClass={'primary'}>
                            Giriş Yap
                        </Button>
                    </BoxFooter>
                </Box>
            </Form>
        </MainBase>
    );
}

const MainBase = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    padding: 20px;

    .form1 {
        width: 450px;
    }
`;

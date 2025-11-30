'use client';

import { Button, cerezOku, cerezSil } from '@sydsoft/base';
import { useEffect, useState } from 'react';

import { sTokenVerify } from '@/_lib/sToken';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

export default function AdminContainer({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [authorized, setAuthorized] = useState(false);
    const [checkedAuth, setCheckedAuth] = useState(false);

    useEffect(() => {
        const cookieAuth = cerezOku(null, 'auth');
        if (!cookieAuth) {
            router.replace('/admin/giris');
            setCheckedAuth(true);
            return;
        }

        const payload = sTokenVerify(cookieAuth);
        if (!payload) {
            cerezSil(null, 'auth');
            router.replace('/admin/giris');
            setCheckedAuth(true);
            return;
        }

        setAuthorized(true);
        setCheckedAuth(true);
        setLoading(false);
    }, [router]);

    if (loading || !checkedAuth) {
        return (
            <LoadingState>
                <span>Yükleniyor...</span>
            </LoadingState>
        );
    }

    if (!authorized) {
        return null;
    }
    return (
        <PageWrapper>
            <Content>
                <PageHeader>
                    <div>
                        <PageTitle>Yönetim Paneli</PageTitle>
                        <PageSubtitle>Kategori, alt kategori ve ürünlerinizi tek ekran üzerinden yönetin.</PageSubtitle>
                    </div>
                    <Badge><Button buttonSize='small' buttonClass='link' onClick={()=>router.replace("/admin/")}>KATEGORİLER</Button></Badge>
                    <Badge><Button buttonSize='small' buttonClass='link' onClick={()=>router.replace("/admin/urunler")}>ÜRÜNLER</Button></Badge>
                    <Badge><Button buttonSize='small' buttonClass='link' onClick={()=>window.open("https://sydsoft.com.tr")}>sydSOFT</Button></Badge>
                    <Button buttonSize='small' buttonClass='danger' onClick={()=>router.replace("/admin/cikis")}>ÇIKIŞ</Button>
                </PageHeader>

                {children}
            </Content>
        </PageWrapper>
    );
}

const PageWrapper = styled.div`
    min-height: 100vh;
    background: linear-gradient(180deg, #032028 0%, #021319 45%, #01090d 100%);
    color: #f7f4e8;
`;

const Content = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px 80px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const PageHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 16px;
    & > div {
        flex-grow: 1;
    }
`;

const PageTitle = styled.h1`
    margin: 0;
    font-size: 28px;
    letter-spacing: 0.5px;
`;

const PageSubtitle = styled.p`
    margin: 4px 0 0;
    color: rgba(255, 255, 255, 0.7);
`;

const Badge = styled.span`
    padding: 6px 14px;
    border-radius: 999px;
    border: 1px solid rgba(202, 163, 61, 0.6);
    color: #caa33d;
    font-size: 13px;
    letter-spacing: 2px;
    text-transform: uppercase;
`;

const LoadingState = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f5f5f5;
    font-size: 15px;
`;

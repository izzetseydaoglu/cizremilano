import { actionSetAnaKategoriler, actionSetConfig, useSite } from '@/_redux/site';
import { useEffect, useState } from 'react';

import { apiList } from '@/_lib/_apiList';
import { sydGet } from '@/_lib/sPostGet';
import Header from '@/app_comps/_mobileMain/Header';
import IndexMenu from '@/app_comps/_mobileMain/Menu';
import { alert_add } from '@sydsoft/base';
import styled from 'styled-components';
import Contact from '../Contact';
import Kategoriler from '../Kategoriler';
import YazBoz from '../YazBoz';
import Footer from './Footer';

export default function MobileMain() {
    const { acikSayfa, config } = useSite();

    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        setLoading(true);
        sydGet({ target: apiList.setup })
            .then((result: any) => {
                if (result?.config) {
                    actionSetConfig(result.config);
                    window.document.title = result.config.baslik || 'sydSOFT Bilişim Hizmetleri';
                }
                if (Array.isArray(result?.anakategoriler)) {
                    const normalizedCategories = result.anakategoriler
                        .map((item: any, index: number) => ({
                            id: item.id ?? index,
                            baslik: item.baslik ?? 'Kategori',
                            icon: (item.resim ?? 'widgets') as string,
                            sira: Number(item.sira ?? item.sirasi ?? index + 1)
                        }))
                        .sort((a: any, b: any) => (a.sira || 0) - (b.sira || 0));
                    actionSetAnaKategoriler(normalizedCategories);
                }
            })
            .catch(() => {
                alert_add({ type: 'error', message: 'Veriler alınırken hata oluştu...' });
            });
    }, []);

    return (
        <Site>
            <Header />
            {!acikSayfa && <IndexMenu />}
            {acikSayfa === 'kategoriler' && <Kategoriler />}
            {acikSayfa === 'yazboz' && <YazBoz />}
            {acikSayfa === 'contact' && <Contact />}
            <Footer />
        </Site>
    );
}

const Site = styled.div`
    position: relative;
    width: 100vh;
    min-width: 300px;
    max-width: 450px;
    height: 100vh;
    min-height: 500px;
    max-height: 900px;
    background: #2c2c2c;
    background: linear-gradient(180deg, #3d4657, #465260, #1e2431);
    background: linear-gradient(180deg, #032028, #465260, #021f27);
    margin: 20px auto;
    padding: 0;
    display: block;
    //background: url("/images/iphone16.png") no-repeat center center fixed;
    //border: 1px solid #000;
    box-shadow: 0 0 20px 8px #caa33d;
    border-radius: 20px;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: auto;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 500px) {
        position: fixed;
        width: 100%;
        height: 100%;
        max-width: none;
        max-height: none;
        border-radius: 0;
        box-shadow: none;
        margin: 0;
        padding: 0;
    }
`;

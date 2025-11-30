import { actionSetAcikSayfa, actionSetKategori, useSite } from '@/_redux/site';

import { Icon } from '@sydsoft/base';
import styled from 'styled-components';
import { useMemo } from 'react';

export default function IndexMenu() {
    const { anaKategoriler, config } = useSite();
    const orderedCategories = useMemo(
        () => [...anaKategoriler].sort((a, b) => (a.sira || 0) - (b.sira || 0)),
        [anaKategoriler]
    );

    const handleWhatsappReservation = () => {
        if (!config.telefon) return;
        const whatsappNumber = config.telefon.replace(/\D/g, '');
        if (!whatsappNumber) return;
        const defaultMessage = encodeURIComponent('Merhaba, rezervasyon için bilgi almak istiyorum.');
        return `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;
    };

    return (
        <Main>
            <Menu>
                {orderedCategories.map((item, index) => {
                    const { id, baslik, icon } = item;
                    return (
                        <li key={index} className={'link'} onClick={() => actionSetKategori(id, baslik)}>
                            <Icon className={'icon'} iconMui={(icon || 'widgets') as any} />
                            <span className={'title'}>{baslik}</span>
                        </li>
                    );
                })}

                {/* <li className={'link'} onClick={() => actionSetAcikSayfa('yazboz')}>
                    <Icon className={'icon'} iconMui="games" />
                    <span className={'title'}>e-YAZBOZ</span>
                </li> */}
                {/* <div className={'ayrac'}></div> */}
                {config.telefon && (
                    <a className={'link'} href={handleWhatsappReservation()} rel="noopener noreferrer">
                        <Icon className={'icon'} iconMui="calendar_today" />
                        <span className={'title'}>REZERVASYON</span>
                    </a>
                )}

                <li className={'link'} onClick={() => actionSetAcikSayfa('contact')}>
                    <Icon className={'icon'} iconMui="pin_drop" />
                    <span className={'title'}>İLETİŞİM</span>
                </li>
            </Menu>
        </Main>
    );
}

const Main = styled.div`
    position: relative;
    width: 100%;
    padding: 20px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const Menu = styled.ul`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;

    .link {
        margin: 10px 5px;
        padding: 10px 20px;
        background: linear-gradient(180deg, #c9a330, #f4e674);
        cursor: pointer;
        transition: all 0.3s;
        border-radius: 10px;
        box-shadow: 0 0 10px 1px #0000008c;
        width: 250px;
        color: #032028;
        font-weight: 500;
        letter-spacing: 2px;
        font-size: 13px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;

        .icon {
            margin-left: 30px;
        }

        .title {
        }
    }

    .link:hover {
        background: #000;
        color: #fff;
    }

    .ayrac {
        margin: 10px 0;
    }
`;

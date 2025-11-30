'use client';

import ListMenu, { typeListMenu } from '@/_comp/ListMenu';
import { actionSetAcikSayfa, useSite } from '@/_redux/site';
import { useEffect, useMemo, useState } from 'react';

import { FilterMenu } from '@/_comp/FilterMenu';
import TitleMenu from '@/_comp/TitleMenu';
import UrunDetay from './UrunDetay';
import { alert_add } from '@sydsoft/base';
import { apiList } from '@/_lib/_apiList';
import { imagesFolder } from '@/_lib/_inc';
import styled from 'styled-components';
import { sydGet } from '@/_lib/sPostGet';

export default function Kategoriler() {
    const { acikKategori, config } = useSite();

    const [loading, setLoading] = useState<boolean>(true);
    const [katList, setKatList] = useState<typeListMenu[]>([]);
    const [urunList, setUrunList] = useState<typeListMenu[]>([]);
    const [detailItem, setDetailItem] = useState<typeListMenu | null>(null);
    const [filter, setFilter] = useState<string>('');

    useEffect(() => {
        setLoading(true);
        sydGet({
            target: apiList.katlist,
            params: { katid: acikKategori?.id }
        })
            .then((result: any) => {
                if (result?.katlist) {
                    const newList: typeListMenu[] = [
                        {
                            id: '',
                            ustid: '',
                            title: 'TÜMÜ'
                        }
                    ];
                    result.katlist.map((item: any) => {
                        newList.push({
                            id: item.id,
                            ustid: item.ustid,
                            title: item.baslik
                        });
                    });
                    setKatList(newList);
                }

                if (result?.urunlist) {
                    const newList: typeListMenu[] = [];
                    result.urunlist.map((item: any) => {
                        let image = item.resim;
                        if (image == '') {
                            image = imagesFolder + '/' + config.logo;
                        } else {
                            image = imagesFolder + '/' + image;
                        }
                        const convertItem = {
                            id: item.id,
                            ustid: item.ustid,
                            title: item.baslik,
                            img: image,
                            description: item.aciklama,
                            price: config.fiyatgoster == '1' ? item.fiyat : undefined,
                            stock: config.stokgoster == '1' ? (item.stok === '1' ? true : false) : undefined,
                            time: item.hazirlamasuresi
                        };
                        newList.push({
                            ...convertItem,
                            onClick: () => setDetailItem(convertItem)
                        });
                    });
                    setUrunList(newList);
                }
            })
            .catch(() => {
                alert_add({ type: 'error', message: 'Listeler alınırken hata oluştu...' });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [acikKategori?.id]);

    const filteredData = useMemo(() => {
        let list: any[];
        if (filter.length > 0) {
            list = urunList.filter((item: typeListMenu) => item.ustid.includes(filter));
        } else {
            list = urunList;
        }
        return list;
    }, [urunList, filter]);

    const NoItemComponent = () => {
        return (
            <NoItem>
                <span>Bu kategoride ürün bulunmamaktadır.</span>
                <img src={`${imagesFolder}/${config.logo}`} alt="No Item" />
            </NoItem>
        );
    };

    return (
        <Main>
            <TitleMenu beforeTitle={'Ana Menu'} onClick={() => actionSetAcikSayfa(null)} title={acikKategori?.title} />
            {katList.length > 0 && (
                <FilterMenu>
                    {katList.map((item, key) => (
                        <div key={key} className={filter == item.id ? 'menuitem active' : 'menuitem'} onClick={() => setFilter(item.id)}>
                            {item.title}
                        </div>
                    ))}
                </FilterMenu>
            )}
            <ListMenu list={filteredData} loading={loading} />

            {filteredData.length === 0 && <NoItemComponent />}

            {detailItem && <UrunDetay item={detailItem} onClose={() => setDetailItem(null)} />}
        </Main>
    );
}

const Main = styled.div`
    position: relative;
    width: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .menuitem {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 3px 12px;
        border-radius: 10px;
        background-color: #1e2430;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: all 0.3s;
        color: #fff;
        font-size: 12px;

        &.active {
            background-color: #ba5823;
            font-weight: bold;
            letter-spacing: 2px;
        }
    }
`;

const NoItem = styled.div`
    position: relative;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;

    span {
        margin-top: 20px;
        color: #d4d4d4;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 1px;
    }

    img {
        margin-top: 20px;
        max-width: 90%;
        object-fit: contain;
        opacity: 0.6;
    }
`;

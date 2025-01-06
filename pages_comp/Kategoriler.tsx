/**
 * Copyright (c) 2024
 *  @author: izzetseydaoglu
 *  @last-modified: 8.04.2024 01:35
 */

import styled from "styled-components";
import React from "react";
import {actionSetAcikSayfa} from "@/_redux/site";
import TitleMenu from "@/_comp/TitleMenu";
import UrunList from "@/_comp/UrunList";

let MenuList: any = [
    {
        name: "FastFood",
        img: "https://qrmenum.net/tema/genel/uploads/urun_kategoriler/kebaplar.jpg",
        title: "Fast Food",
    },
    {
        name: "tavuklar",
        img: "https://qrmenu.rest/img_data/5f9224753d328_kahvalti_cimenn.jpg",
        title: "Tavuklar",
    },
    {
        name: "kebaplar",
        img: "https://qrmenum.net/tema/genel/uploads/urun_kategoriler/kebaplar.jpg",
        title: "Kebaplar",
    },
    {
        name: "baliklar",
        img: "https://qrmenum.net/tema/genel/uploads/urun_kategoriler/Ba%C5%9Fl%C4%B1ks%C4%B1z-3.jpg",
        title: "Balıklar",
    },
]


export default function Kategoriler() {
    return (
        <Main>
            <TitleMenu
                beforeTitle={"Ana Menu"}
                title={"YİYECEKLER"}
                onClick={() => actionSetAcikSayfa(null)}
            />
            <UrunList List={MenuList}/>
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
`;
/**
 * Copyright (c) 2024
 *  @author: izzetseydaoglu
 *  @last-modified: 8.04.2024 01:35
 */

import styled from "styled-components";
import React from "react";


interface Props {
    List: {
        name: string,
        title: string,
        img?: string,
        description?: string,
        price?: number,
        stock?: boolean
    }[]
}

export default function UrunList({List}: Props) {
    return (
        <Menu>
            {
                List.map((item: any, index: number) => (
                    <li key={index}>
                        <div className={"image"}
                             style={{
                                 backgroundImage: `url(${item.img})`,
                                 backgroundSize: "cover",
                                 backgroundPosition: "center"
                             }}
                        />
                        <div className={"detay"}>
                            <span className={"baslik"}>{item.title}</span>
                            {/*<span className={"aciklama"}>Peynir, organik taze domates ve salatalık, ceviz, kayısı kurusu, üzüm kurusu, soslu yeşil ve siyah zeytin, katkısız havuç reçeli, organik Karadeniz tereyağı ve balı, nutella, haşlanmış yada sahanda yumurta. Herhangi bir yiyeceğe alerjiniz varsa, lütfen sipariş vermeden önce servis personelini bilgilendiriniz.</span>*/}
                            {/*<span className={"fiyat"}>210.00 TL</span>*/}
                            {/*<span className={"stok"}>Stokta yok</span>*/}
                        </div>
                    </li>
                ))
            }
            {
                Array(3).fill(0).map((item, index) => (
                    <li key={index} className={"loading"}>
                        <div className={"image"}/>
                        <div className={"detay"}>
                            <span className={"line"}/>
                            <span className={"line"}/>
                            <span className={"line"}/>
                        </div>
                    </li>
                ))
            }
        </Menu>
    );
}

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

    li {
        width: 350px;
        margin: 10px 5px;
        padding: 0;
        background: #1e2430;
        cursor: pointer;
        transition: all 0.3s;
        border-radius: 10px;
        box-shadow: 0 0 10px 1px #0000008c;
        color: #d4d4d4;
        font-weight: 500;
        letter-spacing: 2px;
        font-size: 13px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        overflow: hidden;

        .image {
            flex: 0 0 auto;
            width: 100px;
            height: 100px;
            margin-right: 10px;
            //border: 4px #ffffff54 solid;
            //border-left: none;
        }

        .detay {
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 5px;
            padding: 10px;

            .baslik {
                font-size: 16px;
                font-weight: 500;
            }

            .aciklama {
                font-size: 13px;
                font-weight: 300;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                max-height: 40px;
                line-height: 20px;
            }

            .fiyat {
                font-size: 16px;
                font-weight: 500;
            }

            .stok {
                font-size: 13px;
                font-weight: 300;
            }
        }
    }


    li.loading {

        .image {
            background: #1c1e21;
        }

        .line {
            width: 100%;
            height: 20px;
            background: #1c1e21;
            margin: 5px 0;
        }

        animation: loading 1.5s infinite;

    }

    @keyframes loading {
        0% {
            opacity: 0.5;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0.5;
        }
    }
`;
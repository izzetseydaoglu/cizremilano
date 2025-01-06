/**
 * Copyright (c) 2024
 *  @author: izzetseydaoglu
 *  @last-modified: 8.04.2024 01:35
 */

import styled from "styled-components";
import React from "react";
import {Icon} from "@/_lib/Icon";
import {actionSetAcikSayfa} from "@/_redux/site";

let MenuList: any = {
    yiyecekler: {
        title: "YİYECEKLER",
        icon: "restaurant",
        onClick: () => actionSetAcikSayfa("yiyecekler")
    },
    icecekler: {
        title: "İÇECEKLER",
        icon: "emoji_food_beverage",
        onClick: () => actionSetAcikSayfa(null)
    },
    tatlilar: {
        title: "TATLILAR",
        icon: "cake",
        onClick: () => {}
    },
    nargile: {
        title: "NARGİLE",
        icon: "smoking_rooms",
        onClick: () => {}
    },
    yazboz: {
        title: "e-YAZBOZ",
        icon: "games",
        onClick: () => {}
    },
    rezervasyon: {
        title: "REZERVASYON",
        icon: "calendar_today",
        onClick: () => {}
    }
}


export default function IndexMenu() {
    return (
        <Main>
            <Menu>
                {
                    Object.keys(MenuList).map((key, index) => {
                        let item = MenuList[key];
                        return (
                            <li key={index} className={"link"} onClick={item.onClick}>
                                <Icon className={"icon"} iconMui={item.icon}/>
                                <span className={"title"}>{item.title}</span>
                            </li>
                        )
                    })
                }
            </Menu>

            *Splash da ekleyelim
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

    li.link {
        margin: 10px 5px;
        padding: 10px 20px;
        background: #1e2430;
        cursor: pointer;
        transition: all 0.3s;
        border-radius: 10px;
        box-shadow: 0 0 10px 1px #0000008c;
        width: 250px;
        //color: #fc93fe;
        color: #d4d4d4;
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

    li.link:hover {
        background: #000;
        color: #fff;
    }

    li.ayrac {
        margin: 10px 0;
    }
`;
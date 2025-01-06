/**
 * Copyright (c) 2024
 *  @author: izzetseydaoglu
 *  @last-modified: 20.05.2024 03:35
 */

import styled from "styled-components";
import React from "react";
import {useSite} from "@/_redux/site";
import {useOturum} from "@/_redux/oturum";
import {Icon} from "@sydsoft.com.tr/icon";
import {urlList} from "@/_inc/urllist";
import {Button} from "@sydsoft.com.tr/form";
import AcilirMenu from "@/pages_comp/_main/Leftbar/AcilirMenu";
import {actionUyapOturumKapat, useUYAP} from "@/_redux/uyap";


type typeMenu = {
    title: string,
    href?: string,
    icon?: any,
    list?: typeMenu[],
    noRender?: boolean,
    target?: string,
}

export default function LeftBar({toogleMenu}: any) {
    const {versiyon} = useSite();
    const {buroid, ad, soyad, buroisim, buroadmin, gorev} = useOturum();
    const {uyapLogin, ...other} = useUYAP();

    const menu: typeMenu[] = [
        {
            href: "/",
            title: "Anasayfa",
            icon: <Icon iconMui={"home_filled"}/>
        },
        {
            href: urlList.dosya.listele,
            title: "Dosyalar",
        },
        {
            href: urlList.dosya.olustur,
            title: "Dosya Oluştur",
        },
        {
            href: urlList.vekaletnameler.listele,
            title: "Vekaletnameler",
        },
        {
            href: urlList.taraflar.listele,
            title: "Taraflar",
            icon: <Icon iconMui={"person_pin_circle"}/>
        },
        {
            href: urlList.uyaplogin,
            title: "UYAP Oturum Aç",
            noRender: (uyapLogin)
        },
        {
            title: "UYAP",
            list: [
                {
                    href: urlList.uyap.dosyasorgulama_basit,
                    title: "Dosya Sorgulama - Basit",
                },
                {
                    href: urlList.uyapsafahatsorgula_genel,
                    title: "Safahat Sorgulama - Genel",
                },
                {
                    href: urlList.uyapsafahatsorgula_icra,
                    title: "Safahat Sorgulama - İcra",
                },
                {
                    href: urlList.uyapdurusmalistesi,
                    title: "Duruşma Listesi",
                },
                {
                    href: urlList.uyapdosyasorgula,
                    title: "Dosya Sorgulama",
                },
                {
                    href: urlList.uyaptopludosyasorgula,
                    title: "Dosya Sorgulama - Toplu",
                },
                {
                    href: urlList.uyaptoplutarafsorgula,
                    title: "Toplu Taraf Sorgusu",
                },
                {
                    href: "/uyap/test",
                    title: "Test",
                },
                {
                    href: "/uyap/dosyaindir",
                    title: "Evrak indir",
                },
            ],
            // noRender: !uyapLogin
        },
        {
            href: urlList.oturum.cikis,
            title: "Oturumu Kapat",
            icon: <Icon iconMui={"exit_to_app"}/>
        },
        {
            href: "/_test",
            title: "test",
            icon: <Icon iconMui={"home_filled"}/>
        }, {
            href: "https://klavyeanaliz.org/admin/cachesifirla.php",
            title: "Reset Cache",
            target: "_blank",
            icon: <Icon iconMui={"home_filled"}/>
        },
        {
            title: "Yönetici",
            list: [
                {
                    href: urlList.yonetici.google,
                    title: "Google Entegrasyonu",
                }
            ],
            noRender: !buroadmin
        },
    ]
    return (
        <MainBase>
            <MenuBase>
                {
                    menu.map((item: any, key: React.Key) => {
                        if (item.noRender) return null;
                        if (item.hasOwnProperty("list")) {
                            return <AcilirMenu key={key} menu={item}/>
                        } else {
                            return <Button buttonClass={"link"} key={key} className={"menu"} href={item.href || "#"} target={item.target}>
                                <div className={"title"}><span>{item.title}</span></div>
                                {item.icon && <div className={"icon"}>{item.icon}</div>}
                            </Button>
                        }
                    })
                }
            </MenuBase>

            BuroID:{buroid} <br/>
            Ad:{ad} {soyad} <br/>
            Büro:{buroisim} <br/>
            Görev:{gorev} <br/>
            Versiyon:{versiyon} <br/>
            {/*Socket:{socketStatus ? "Açık" : "Kapalı"} <br/>*/}
            UYAP:{other.ad} {other.soyad} <br/>
            <Button className={"cikis"}
                    onlyIcon={<Icon iconMui={"exit_to_app"}/>}
                    title={"UYAP oturumunu kapat"}
                    onClick={actionUyapOturumKapat}
            />
            {/*<UyapStatus/>*/}

            test:123

        </MainBase>
    );
}

const MainBase = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    min-height: 100%;
    padding: 0;
`;

const MenuBase = styled.div`
    width: 100%;
    padding: 20px;

    .menu {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        transition: ease-in-out 0.2s;
        background: #ffffffa8 !important;
        margin: 5px 0;
        padding: 6px 10px;

        &.active,
        &:hover {
            box-shadow: 0 0 4px 0 #6899d0 !important;
        }

        .icon {
            display: inline-flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            flex: 0 0 auto;
            border-radius: 50%;
            margin-left: 10px;
            color: #6198bd;
        }

        .title {
            display: flex;
            flex: 1;
            font-weight: 500;
            font-size: 1rem;
            letter-spacing: 0.05px;
            color: #146da7;
            overflow: hidden;

            span {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
        }
    }
`;
/**
 * Copyright (c) 2024
 *  @author: izzetseydaoglu
 *  @last-modified: 8.04.2024 01:35
 */

import styled from "styled-components";
import React from "react";
import {useSite} from "@/_redux/site";
import IndexMenu from "@/pages_comp/_mobileMain/Menu";
import Header from "@/pages_comp/_mobileMain/Header";
import Kategoriler from "@/pages_comp/Kategoriler";


export default function MobileMain() {
    const {acikSayfa} = useSite();
    return (
        <Site>
            <Header/>
            {!acikSayfa && <IndexMenu/>}
            {(acikSayfa==="yiyecekler") && <Kategoriler/>}
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
    margin: 20px auto;
    padding: 0;
    display: block;
    //background: url("/images/iphone16.png") no-repeat center center fixed;
    //border: 1px solid #000;
    box-shadow: 0 0 20px 8px #9a9a9a;
    border-radius: 20px;
    overflow-x: hidden;
    overflow-y: auto;
    overlay: auto;
`;

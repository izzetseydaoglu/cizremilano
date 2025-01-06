/**
 * Copyright (c) 2024
 *  @author: izzetseydaoglu
 *  @last-modified: 8.04.2024 01:35
 */

import styled from "styled-components";
import React from "react";
import {useSite} from "@/_redux/site";


export default function Header() {
    const {acikSayfa} = useSite();
    return (
        <Main className={acikSayfa ? "gizle" : ""}>
            <img src={"/images/afis.jpeg"} alt={"afis"}/>
            <div className={"logotext"}>MİLANO CAFE & RESTAURANT</div>
        </Main>
    );
}
const Main = styled.div`
    position: relative;
    content: " ";
    display: block;
    width: 100%;
    border-bottom: 5px #bc54ed8c solid;
    margin-bottom: 20px;
    overflow: hidden;

    * {
        transition: all 0.5s;
    }
    img {
        display: block;
        width: 100%;
    }

    .logotext {
        position: absolute;
        width: 100%;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
    }

    &.gizle {
        content: " ";
        position: relative;
        width: 100%;
        height: 60px;
        background: linear-gradient(180deg, #3d4657, #465260, #1e2431);
        border-bottom: 2px #000000 solid;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;

        img {
            margin-top: -110%;
        }

        .logotext {
            display: block;
            font-size: 16px;
            color: #f2f2f2;
            font-weight: 500;
            letter-spacing: 5px;
            z-index: 1;
        }


    }
`;
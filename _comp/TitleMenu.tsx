/**
 * Copyright (c) 2024
 *  @author: izzetseydaoglu
 *  @last-modified: 8.04.2024 01:35
 */

import styled from "styled-components";
import React from "react";
import {Icon} from "@/_lib/Icon";


interface Props {
    beforeTitle?: string;
    title?: string;
    onClick?: () => void;
}

export default function TitleMenu({beforeTitle, title, onClick}: Props) {
    return (
        <Main>
            <div className={"geri"} onClick={onClick}>
                <Icon className={"btn"} iconMui={"chevron_left"}/> {beforeTitle}
            </div>
            <div className={"altbaslik"}>{title}</div>
        </Main>
    );
}

const Main = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 10px;
    padding: 0 20px 0 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background: #1e2430;
    border: 1px #ffffff45 solid;
    border-left: none;
    border-right: none;
    color: #de641d;

    .geri {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;

        .btn {
            font-size: 36px;
        }
    }

    .altbaslik {
        font-size: 15px;
        font-weight: 500;
        margin-left: auto;
    }
`;
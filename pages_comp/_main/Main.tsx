/**
 * Copyright (c) 2024
 *  @author: izzetseydaoglu
 *  @last-modified: 8.04.2024 01:35
 */

import styled from "styled-components";
import React from "react";
import LeftBar from "./Leftbar/LeftBar";
import Head from "next/head";

interface Props {
    children: any,
    style?: object,
    styleContent?: object,
    title?: string,
    padding?: string | number,
}

export default function Main({children, title, style, padding, styleContent, ...other}: Props) {
    return (
        <Site style={style}  {...other}>
            {title && <Head><title>{title}</title></Head>}
            <div className={"leftbar"}>
                <LeftBar/>
            </div>

            <div className={"content"} style={{
                padding: padding,
                ...styleContent
            }}>
                {children}
            </div>

        </Site>
    );
}

const Site = styled.div`
    position: relative;
    width: 100%;
    min-width: 500px;
    //min-width: 1366px;
    height: 100%;
    margin: 0 auto;
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: flex-start;

    .leftbar {
        z-index: 998;
        position: sticky;
        top: 0;
        overflow-x: hidden;
        width: 300px;
        height: 100%;
        flex: 0 0 auto;
        background: #f5f6f8;
        background: linear-gradient(#f5f6f8, #b2bac3);
        border-right: 1px #b3bbc4 solid;
    }

    .content {
        position: relative;
        flex: 1;
        height: 100%;
        overflow-x: auto;
        padding: 15px;
        margin: 0;

        display: inline-flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

`;
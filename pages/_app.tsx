/**
 * Copyright (c) 2024
 *  @author: izzetseydaoglu
 *  @last-modified: 8.04.2024 01:35
 */

import "../styles/globals.css";
import type {AppProps} from "next/app";
import {wrapper} from "@/_redux";
import {Provider} from "react-redux";
import Head from "next/head";
import React, {useEffect} from "react";

export default function App({Component, ...rest}: AppProps) {
    const {store, props} = wrapper.useWrappedStore(rest);
    const {pageProps} = props;

    useEffect(() => {
        if (window.location.hostname === "localhost:3400") window.location.href = "https://dev.cizremilano.com";
    }, [])

    return (
        <Provider store={store}>
            <>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                    <meta httpEquiv="content-type" content="text/html; charset=utf-8"/>

                    <title>{store.getState().site.title}</title>
                    <meta name="description" content={store.getState().site.description}/>
                </Head>
                <Component {...pageProps} />
            </>
        </Provider>
    );
}

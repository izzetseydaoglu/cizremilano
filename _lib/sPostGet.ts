/**
 * Copyright (c) 2024
 *  @author: izzetseydaoglu
 *  @last-modified: 8.04.2024 01:35
 */
import axios from "axios";
import {apiUrl, isDev} from "@/_inc/inc";
import {alert_add, alertCheck} from "@sydsoft.com.tr/alert";
import {storeClone} from "@/_redux";
import {cerezOku} from "@/_lib/cookies";
import {getDevKey} from "@/_redux/site";


type typeSerializeKey = { [key: string | number]: any };

function serializeKey(object: typeSerializeKey) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}

type typeParams = {
    folder?: string,
    page?: string,
    adminapi?: boolean,
    class?: string,
    method?: string,
    args?: object | string,
    [key: string | number]: any;
};

interface PropsSydGet {
    params: typeParams,
    url?: string | undefined,
    cancelToken?: any
}

interface PropsSydPost {
    url?: string | undefined,
    data: { [key: string | number]: any },
    params?: typeParams,
    cancelToken?: any
}

interface PropsSydServetGet extends PropsSydGet {
    context: any,
}


export async function sydPost({url, data, params, cancelToken}: PropsSydPost) {
    // if (!data || !params) return console.log("Hatalı istek...");
    if (url === undefined) url = apiUrl;
    if (params && params["args"]) params["args"] = JSON.stringify(params["args"]);
    try {
        let response = await axios.post(url, serializeKey(data), {
            params: {...params, isDev: getDevKey()},
            cancelToken,
            withCredentials: true,
            headers: {
                "Content-Type": "application/form-data; charset=utf-8",
                "Authorization": "Bearer " + storeClone.getState().oturum.auth || "",
            }
        });
        return await checkResponse(response);
    } catch (error) {
        return await checkError(error);
    }
}

export async function sydGet({url, params, cancelToken}: PropsSydGet) {
    if (url === undefined) url = apiUrl;
    if (params["args"]) params["args"] = JSON.stringify(params["args"]);
    try {
        let response = await axios.get(url, {
            params: {...params, isDev: getDevKey()},
            cancelToken,
            withCredentials: true,
            headers: {
                "Authorization": "Bearer " + storeClone.getState().oturum.auth || "",
                "Content-Type": "application/form-data; charset=utf-8",
            }
        });
        return await checkResponse(response);
    } catch (error) {
        return await checkError(error);
    }
}

export async function sydSSRGet({context, url, params, cancelToken}: PropsSydServetGet) {
    if (url === undefined) url = apiUrl;
    if (params["args"]) params["args"] = JSON.stringify(params["args"]);
    try {
        const res = await axios.get(url, {
            params: {...params, isDev: process.env.DEVKEY},
            cancelToken,
            withCredentials: true,
            headers: {
                "Content-Type": "application/form-data; charset=utf-8",
                cookie: context.req.headers.cookie || {},
                "Authorization": "Bearer " + cerezOku(context, "auth") || "",
            }
        });
        return await res.data || {};
    } catch (e) {
        return false;
    }
}

function checkResponse(response: any) {
    if (response.data["forcelogin"] && typeof window !== undefined) {
        window.location.href = "/oturum";
        return;
    }
    alertCheck(response);
    return response.data;
}

function checkError(error: any) {
    if (axios.isCancel(error)) {
        isDev && console.log('Request canceled', error.message);
        return false;
    } else if (!error.status) {
        alert_add({type: 'error', message: 'Bağlantı hatası...'})
        console.log("Bağlantı hatası...");
        return false;
    } else {
        return error;
    }
}
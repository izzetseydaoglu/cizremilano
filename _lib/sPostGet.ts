import { alertCheck, alert_add, cerezOku, isDev } from '@sydsoft/base';
import { apiUrl, siteKey } from './_inc';

import axios from 'axios';
import { getDevKey } from '@/_redux/site';

type typeSerializeKey = { [key: string | number]: any };

function serializeKey(object: typeSerializeKey) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
}

type typeParams = {
    folder?: string;
    page?: string;
    adminapi?: boolean;
    class?: string;
    method?: string;
    args?: object | string;
    [key: string | number]: any;
};

interface PropsSydGet {
    params?: typeParams;
    url?: string | undefined;
    target?: string | undefined;
    cancelToken?: any;
}

interface PropsSydPost {
    url?: string | undefined;
    target?: string | undefined;
    data: { [key: string | number]: any };
    params?: typeParams;
    cancelToken?: any;
    sourceForm?: any;
}

interface PropsSydServerGet extends PropsSydGet {
    context: any;
}

export async function sydPost({ url, target, sourceForm, data, params, cancelToken }: PropsSydPost) {
    let urlTarget = url;
    if (urlTarget === undefined) urlTarget = apiUrl;
    if (target) urlTarget = urlTarget + '/' + target;

    const reqList: object[] = [];
    if (sourceForm) {
        sourceForm.target.querySelectorAll('[required]').forEach((req: any) => reqList.push(req.name));
    }

    try {
        const response = await axios.post(urlTarget, serializeKey({ ...data, requiredfields: reqList.join(',') }), {
            params: { ...params, sitekey: siteKey, isDev: getDevKey() },
            cancelToken,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/form-data; charset=utf-8',
                Authorization: 'Bearer ' + cerezOku(null, 'auth') || ''
            }
        });
        return await checkResponse(response);
    } catch (error) {
        return await checkError(error);
    }
}

export async function sydGet({ url, target, params = {}, cancelToken }: PropsSydGet) {
    let urlTarget = url;
    if (urlTarget === undefined) urlTarget = apiUrl;
    if (target) urlTarget = urlTarget + '/' + target;
    try {
        const response = await axios.get(urlTarget, {
            params: { ...params, sitekey: siteKey, isDev: getDevKey() },
            cancelToken,
            withCredentials: true,
            headers: {
                Authorization: 'Bearer ' + cerezOku(null, 'auth') || '',
                'Content-Type': 'application/form-data; charset=utf-8'
            }
        });
        return await checkResponse(response);
    } catch (error) {
        return await checkError(error);
    }
}

export async function sydSSRGet({ context, url, target, params = {}, cancelToken }: PropsSydServerGet) {
    let urlTarget = url;
    if (urlTarget === undefined) urlTarget = apiUrl;
    if (target) urlTarget = urlTarget + '/' + target;
    try {
        const res = await axios.get(urlTarget, {
            params: { ...params, sitekey: siteKey, isDev: process.env.DEVKEY },
            cancelToken,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/form-data; charset=utf-8',
                cookie: context.req.headers.cookie || {},
                Authorization: 'Bearer ' + cerezOku(context, 'auth') || ''
            }
        });
        return (await res.data) || {};
    } catch (e) {
        isDev && console.log(e);
        return false;
    }
}

function checkResponse(response: any) {
    if (response.data['forcelogin'] && typeof window !== undefined) {
        window.location.href = '/admin/giris';
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
        alert_add({ type: 'error', message: 'Bağlantı hatası...' });
        console.log('Bağlantı hatası...');
        return false;
    } else {
        return error;
    }
}

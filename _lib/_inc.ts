/**
 * Copyright (c) 2024
 *  @author: izzetseydaoglu
 *  @last-modified: 30.04.2024 21:09
 */

export const isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === "development");
export const isServerReq = (context: any) => !context?.req?.url?.startsWith('/_next');
export const apiUrl = "https://betaapi.davasis.com";
export const apiImageUrl = "https://betaapi.davasis.com/assets/images";
export const apiDownloadFileURL = "https://betaapi.davasis.com/download/drive/";
export const apiViewFileURL = "https://betaapi.davasis.com/view/drive/";
export const googleViewURL = "https://docs.google.com/viewer?embedded=true&url=https://drive.google.com/uc?id=";
export const googleViewURLExternal = "https://docs.google.com/viewer?embedded=true&url=";
export const googleDirectViewURL = "https://drive.google.com/uc?embedded=true&export=view&id=";
export const googleDirectViewURL2 = "https://drive.usercontent.google.com/download?authuser=0&id=";

export const editorLink = isDev ? "https://deveditor.davasis.com/" : "https://editor.davasis.com/";
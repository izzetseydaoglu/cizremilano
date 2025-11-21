import { isDev } from "@sydsoft/base";

export function sTokenParse(token: string) {
  try {
    token = token ? atob(token) : "";
    if (token == "") return null;

    const payloadPart = token.split(".")[0];
    if (!payloadPart) return null;

    // UTF-8 decode
    const json = decodeURIComponent(
      Array.prototype.map
        .call(atob(payloadPart), (c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );

    return JSON.parse(json);
  } catch (e: any) {
    isDev && console.log("parseJwt error:", e.message);
    return null;
  }
}

export function sTokenVerify(token: string) {
  try {
    const parseToken = sTokenParse(token);
    if (!parseToken) return null;

    const exp = parseToken.exp;
    if (!exp) return null;

      const now = Math.floor(Date.now() / 1000);
      isDev && console.log("exp:", exp, "now:", now);
    if (now >= exp) return null;

    return parseToken.data;
  } catch (e: any) {
    isDev && console.log("parseJwt error:", e.message);
    return null;
  }
}

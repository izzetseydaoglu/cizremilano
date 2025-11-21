export function md5HASH(data: any): any {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const md5 = require('md5');
    return md5(data);
}

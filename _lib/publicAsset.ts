const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const withBasePath = (path: string = '') => {
    if (!path) {
        return basePath || '/';
    }

    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    if (!basePath) {
        return normalizedPath;
    }

    const trimmedBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;

    return `${trimmedBase}${normalizedPath}`;
};

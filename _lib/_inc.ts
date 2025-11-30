export const siteKey = 'cizremilano';

export const apiUrl = `https://api.sydsoft.com.tr/qrmenu`;
export const imagesFolder = `https://api.sydsoft.com.tr/images/qrmenu/${siteKey}`;
export const imagesOrtakFolder = `https://api.sydsoft.com.tr/images/qrmenu`;

export const buildImagePath = (image?: string) => {
    if (!image) return '';
    return `${imagesFolder}/${image}`;
};

import { useSite } from '@/_redux/site';
import { withBasePath } from '@/_lib/publicAsset';
import styled from 'styled-components';

export default function SosyalMedyaMenu() {
    const { config } = useSite();

    return (
        <MainBase>
            {config.facebook && (
                <a href={config.facebook} target={'_blank'}>
                    <img src={withBasePath('/images/sosyal_facebook.png')} alt={'Facebook'} />
                </a>
            )}
            {config.twitter && (
                <a href={config.twitter} target={'_blank'}>
                    <img src={withBasePath('/images/sosyal_twitter.png')} alt={'Twitter'} />
                </a>
            )}
            {config.instagram && (
                <a href={config.instagram} target={'_blank'}>
                    <img src={withBasePath('/images/sosyal_instagram.png')} alt={'Instagram'} />
                </a>
            )}
            {config.youtube && (
                <a href={config.youtube} target={'_blank'}>
                    <img src={withBasePath('/images/sosyal_youtube.png')} alt={'Youtube'} />
                </a>
            )}
            {config.tiktok && (
                <a href={config.tiktok} target={'_blank'}>
                    <img src={withBasePath('/images/sosyal_tiktok.png')} alt={'TikTok'} />
                </a>
            )}
        </MainBase>
    );
}

const MainBase = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: auto auto 0 auto;

    a {
        margin: 0 10px;

        img {
            width: 30px;
            height: 30px;
            transition: transform 250ms ease-in-out 0s;
        }

        &:hover img {
            transform: scale(1.4);
        }
    }
`;

'use client';

import { useSite } from '@/_redux/site';
import styled from 'styled-components';

export default function Contact() {
    const { config } = useSite();

    return (
        <Main>
            <iframe
                id="gmap_canvas"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.703460686022!2d42.19261537658356!3d37.32585137210207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4009654b9cd3c38d%3A0x61351e18ac979abb!2sMilano%20cafe%20restaurant!5e0!3m2!1str!2str!4v1763303923011!5m2!1str!2str"
                frameBorder="0"
                scrolling="no"
            />

            {config.adres && (
                <div className="iletisim_satir">
                    <i className="icon material-icons">location_on</i>
                    <span className="text">{config.adres}</span>
                </div>
            )}

            {config.telefon && (
                <a className="iletisim_satir" href={'tel:' + config.telefon}>
                    <i className="icon material-icons">phone</i>
                    <span className="text">{config.telefon}</span>
                </a>
            )}

            {config.email && (
                <a className="iletisim_satir" href={'mailto:' + config.email} target="_blank">
                    <i className="icon material-icons">email</i>
                    <span className="text">{config.email}</span>
                </a>
            )}
        </Main>
    );
}

const Main = styled.div`
    position: relative;
    width: 100%;
    padding: 0;
    /* display: flex; */
    /* flex-direction: column; */
    /* justify-content: flex-start; */
    /* align-items: flex-start; */

    #gmap_canvas {
        width: 100%;
        height: 350px;
        margin: -10px 0 20px 0;
        border: none;
        box-shadow: 0 0 16px 0 #b7bfc7;
        background: #e3e3e3;
        transition: all 0.3s ease-in-out;
    }

    .iletisim_satir {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin: 15px 0;
        padding: 0 10px;
        width: 100%;
        text-decoration: none;
        color: inherit;
        line-height: 1.5;
        font-size: 1.2rem;
        color: #e3e3e3;

        .icon {
            flex: 0 0 auto;
            width: 50px;
            text-align: center;
            color: #e28c0a;
            font-size: 20px;

            &.text {
                font-size: 1.1rem;
                letter-spacing: -1px;
            }
        }
    }
`;

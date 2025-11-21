import { actionSetAcikSayfa, useSite } from '@/_redux/site';

import { imagesFolder } from '@/_lib/_inc';
import styled from 'styled-components';

export default function Header() {
    const { acikSayfa, config } = useSite();
    return (
        <Main className={acikSayfa ? 'gizle' : ''} onClick={() => actionSetAcikSayfa(null)}>
            <img src={`${imagesFolder}/${config.logo}?1`} alt={'Logo'} />
            <div className={'logotext'}>
                {config.baslik}
            </div>
        </Main>
    );
}
const Main = styled.div`
    display: flex;
    flex: 0 0 auto;
    position: relative;
    content: ' ';
    display: block;
    width: 100%;
    border-bottom: 5px #e4ca52 solid;
    margin-bottom: 20px;
    overflow: hidden;

    * {
        transition: all 0.5s;
    }
    img {
        display: block;
        width: 100%;
    }

    .logotext {
        position: absolute;
        width: 100%;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
        cursor: pointer;
    }

    &.gizle {
        content: ' ';
        position: relative;
        width: 100%;
        height: 75px;
        /* background: linear-gradient(180deg, #3d4657, #465260, #1e2431); */
        background: linear-gradient(180deg, #c9a330, #f4e674);
         color: #032028;
        border-bottom: 2px #c8a439 solid;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;

        img {
            margin-top: -65%;
            transition: all 1.5s;
        }

        .logotext {
            display: none;
            font-size: 17px;
            font-weight: bold;
            letter-spacing: 5px;
            z-index: 1;
        }
    }
`;

import { Icon } from '@sydsoft/base';
import styled from 'styled-components';

interface Props {
    beforeTitle?: string;
    title?: string;
    onClick?: () => void;
}

export default function TitleMenu({ beforeTitle, title, onClick }: Props) {
    return (
        <Main>
            <div className={'geri'} onClick={onClick}>
                <Icon iconMui={'chevron_left'} fontSize={24} /> {beforeTitle}
            </div>
            <div className={'altbaslik'}>{title}</div>
        </Main>
    );
}

const Main = styled.div`
position: relative;
    width: 100%;
    margin-bottom: 10px;
    padding: 0 20px 0 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background: #1e2430;
    border-bottom: 1px #00000057 solid;
    border-left: none;
    border-right: none;
    color: #ece7e4;
    margin-top: -10px;

    .geri {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        padding: 10px 10px 10px 0;
        gap: 10px;
    }

    .altbaslik {
        font-size: 15px;
        font-weight: 500;
        margin-left: auto;
        padding: 10px;
        cursor: default;
    }
`;

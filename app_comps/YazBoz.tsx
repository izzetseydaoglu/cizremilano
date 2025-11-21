'use client';

import { useSite } from '@/_redux/site';
import styled from 'styled-components';

export default function YazBoz() {
    const { config } = useSite();

    return <Main>Tasarım aşamasındadır...</Main>;
}

const Main = styled.div`
    position: relative;
    width: 100%;
    padding: 20px;
    text-align: center;
    color: #e28c0a;
    font-size: 20px;
    font-weight: bold;
`;

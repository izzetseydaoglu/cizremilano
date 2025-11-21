import styled from 'styled-components';
import SosyalMedyaMenu from './SosyalMedyaMenu';

export default function Footer() {
    return (
        <MainBase>
            <SosyalMedyaMenu />
        </MainBase>
    );
}

const MainBase = styled.div`
    display: flex;
    flex: 0 0 auto;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: auto auto 0 auto;
    padding: 20px 0;
`;

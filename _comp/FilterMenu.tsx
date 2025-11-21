import styled from 'styled-components';

interface Props {
    children: any;
}

export const FilterMenu = ({ children }: Props) => {
    return <MainBase>{children}</MainBase>;
};
const MainBase = styled.div`
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    flex: 1;
    white-space: nowrap;
    overflow: auto hidden;
    -webkit-box-pack: start;
    scroll-behavior: smooth;
    transition: all 0.5s;
    padding: 0 15px;
    gap: 10px;
    margin-bottom: 10px;
    user-select: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

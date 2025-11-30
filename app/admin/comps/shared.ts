import styled from 'styled-components';

export const STable = styled.table`
    width: 100%;
    border-collapse: collapse;

    th,
    td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    th {
        background: rgba(255, 255, 255, 0.05);
        font-weight: 600;
        font-size: 14px;
    }

    tr:hover {
        background: rgba(255, 255, 255, 0.03);
    }

    .tablemenu {
        white-space: nowrap;
        & > * {
            margin-right: 5px;
        }
    }
`;

import styled from 'styled-components';

export type typeListMenu = {
    id: string;
    ustid: string;
    title: string;
    img?: string;
    description?: string;
    price?: number;
    stock?: boolean;
    time?: string;
    onClick?: () => void;
};
interface Props {
    list: typeListMenu[];
    loading: boolean;
}

export default function ListMenu({ list, loading }: Props) {
    const LoadingComponent = () => {
        return Array(5)
            .fill(0)
            .map((item, index) => (
                <li key={index} className={'loading'}>
                    <div className={'image'} />
                    <div className={'detay'}>
                        <span className={'line'} />
                        <span className={'line'} />
                        <span className={'line'} />
                    </div>
                </li>
            ));
    };

    return (
        <Menu>
            {list.map((item: typeListMenu, index: number) => (
                <li key={index} onClick={item.onClick}>
                    <div
                        className={'image'}
                        style={{
                            backgroundImage: `url(${item.img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                    <div className={'detay'}>
                        <span className={'baslik'}>{item.title}</span>
                        <span className={'fiyat'} hidden={!item.price}>
                            {item.price} TL
                        </span>
                    </div>
                </li>
            ))}
            {loading && <LoadingComponent />}
        </Menu>
    );
}

const Menu = styled.ul`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
        width: 85%;
        margin: 10px 5px;
        padding: 0;
        background-color: #1e2430;
        background:linear-gradient(180deg, #1e2430, #040e1a, #021f27);
        cursor: pointer;
        transition: all 0.3s;
        border-radius: 10px;
        box-shadow: 0 0 10px 1px #0000008c;
        color: #d4d4d4;
        font-weight: 500;
        letter-spacing: 2px;
        font-size: 13px;
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        gap: 10px;
        overflow: hidden;

        .image {
            flex: 0 0 auto;
            width: 100px;
            height: 100px;
        }

        .detay {
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            align-self: stretch;
            gap: 10px;
            padding: 10px 10px 5px 5px;

            .baslik {
                font-size: 14px;
                font-weight: 500;
            }

            .fiyat {
                font-size: 12px;
                font-weight: 400;
                margin-top: auto;
                align-self: flex-end;
                padding: 2px 10px;
                background: #2b3343;
                border-radius: 10px;
            }
        }
    }

    li.loading {
        .image {
            background: #1c1e21;
        }

        .line {
            width: 100%;
            height: 20px;
            background: #1c1e21;
            margin: 5px 0;
        }

        animation: loading 1.5s infinite;
    }

    @keyframes loading {
        0% {
            opacity: 0.5;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0.5;
        }
    }
`;

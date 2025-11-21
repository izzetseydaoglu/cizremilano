'use client';

import { useEffect, useRef, useState } from 'react';

import { typeListMenu } from '@/_comp/ListMenu';
import { useSite } from '@/_redux/site';
import { Icon } from '@sydsoft/base';
import styled from 'styled-components';

interface UrunDetayProps {
    item: typeListMenu;
    onClose: () => void;
}

export default function UrunDetay({ item, onClose }: UrunDetayProps) {
    const { config } = useSite();
    const [isActive, setIsActive] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const frame = requestAnimationFrame(() => setIsActive(true));
        return () => {
            cancelAnimationFrame(frame);
            if (closeTimeout.current) clearTimeout(closeTimeout.current);
        };
    }, []);

    const handleClose = () => {
        if (isClosing) return;
        setIsClosing(true);
        closeTimeout.current = setTimeout(() => {
            onClose();
        }, 320);
    };

    const sheetState = `${isActive && !isClosing ? 'active' : ''} ${isClosing ? 'closing' : ''}`.trim();

    return (
        <Sheet className={sheetState} onClick={(e) => e.stopPropagation()}>
            <Header>
                <Title>{item?.title ?? 'Ürün Detayı'}</Title>
                <CloseButton type="button" onClick={handleClose} aria-label="Kapat">
                    <Icon iconMui="close" />
                </CloseButton>
            </Header>
            <Content>
                {item?.img && <Image src={item.img} alt={item?.title ?? 'ürün görseli'} />}
                {item?.description && <Description>{item.description}</Description>}
                <Details>
                    {item?.price && config.fiyatgoster == '1' && <span>Fiyat: {item.price} ₺</span>}
                    {item?.time && <span>Hazırlanma Süresi: {item.time} dk</span>}
                    {typeof item?.stock !== 'undefined' && config.stokgoster == '1' && <span>Stok Durumu: {item.stock ? 'Var' : 'Yok'}</span>}
                </Details>
            </Content>
        </Sheet>
    );
}

const Sheet = styled.div`
    position: absolute;
    width: 95%;
    height: calc(100vh - 130px);
    top: 10px;
    background: linear-gradient(66deg, #032028, #465260, #021f27);
    border-radius: 20px 20px 0 0;
    padding: 20px 24px 40px;
    overflow-y: auto;
    transform: translateY(100%);
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: #f5f5f5;

    &.active {
        transform: translateY(0);
    }

    &.closing {
        transform: translateY(100%);
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`;

const Title = styled.h3`
    margin: 0;
    font-size: 20px;
    color: #f7f7f7;
    letter-spacing: 1px;
`;

const CloseButton = styled.button`
    border: none;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    color: #f2f2f2;

    &:hover {
        background: rgba(255, 255, 255, 0.18);
        transform: scale(1.05);
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: #f2f2f2;
`;

const Details = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    font-size: 14px;
    font-weight: 600;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    span {
        font-size: 12px;
        font-weight: 400;
        margin-top: auto;
        align-self: flex-end;
        padding: 2px 10px;
        background: #ba5823;
        border-radius: 10px;
    }
`;

const Image = styled.img`
    width: 100%;
    max-width: 400px;
    max-height: 250px;
    object-fit: cover;
    border-radius: 16px;
    box-shadow: 0 0 4px 0px #ffffff;
`;

const Description = styled.p`
    margin: 0;
    line-height: 1.6;
    font-size: 15px;
    color: #d6d7db;
    padding: 10px;
`;

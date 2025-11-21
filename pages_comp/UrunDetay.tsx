'use client';

import { useEffect, useRef, useState } from 'react';

import { Icon } from '@sydsoft/base';
import styled from 'styled-components';
import { typeListMenu } from '@/_comp/ListMenu';

interface UrunDetayProps {
    item: typeListMenu;
    onClose: () => void;
}

export default function UrunDetay({ item, onClose }: UrunDetayProps) {
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
        <Backdrop onClick={handleClose}>
            <Sheet className={sheetState} onClick={(e) => e.stopPropagation()}>
                <DragBar />
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
                        {item?.price && <span>Fiyat: {item.price} ₺</span>}
                        {item?.time && <span>Hazırlanma: {item.time} dk</span>}
                        {typeof item?.stock !== 'undefined' && <span>Stok: {item.stock ? 'Var' : 'Yok'}</span>}
                    </Details>
                </Content>
            </Sheet>
        </Backdrop>
    );
}

const Backdrop = styled.div`
    position: absolute;
    inset: 0;
    background: rgba(7, 7, 7, 0.6);
    z-index: 50;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: stretch;
    padding-top: 70px;
    border-radius: inherit;
`;

const Sheet = styled.div`
    width: 100%;
    height: calc(100% - 70px);
    background: linear-gradient(180deg, #3d4657 0%, #1e2430 70%, #151923 100%);
    border-radius: 20px 20px 0 0;
    padding: 30px 24px 40px;
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

const DragBar = styled.div`
    width: 55px;
    height: 5px;
    border-radius: 999px;
    background: #5c6374;
    margin: 0 auto 12px auto;
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

const Image = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 16px;
`;

const Description = styled.p`
    margin: 0;
    line-height: 1.6;
    font-size: 15px;
    color: #d6d7db;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 14px;
    font-weight: 600;

    span {
        color: #f3f3f3;
    }
`;

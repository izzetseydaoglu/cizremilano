/**
 * Copyright (c) 2024
 *  @author: izzetseydaoglu
 *  @last-modified: 8.04.2024 01:35
 */

import styled from "styled-components";
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {Button} from "@sydsoft.com.tr/form";
import {Icon} from "@sydsoft.com.tr/icon";

interface Props {
    menu: any,
    opened?: boolean,
}

export default function AcilirMenu({menu, opened = false}: Props) {
    const router = useRouter();
    const [open, setOpen] = React.useState(opened);

    useEffect(() => {
        const isActive = Object.values(menu.list).find((item: any) => router.pathname === item.href);
        if (isActive) {
            setOpen(true);
        }
    }, [])

    return (
        <MainBase className={open ? "open" : ""}>
            <Button buttonClass={"link"} className={"menu"} onClick={() => setOpen(!open)}>
                <div className={"title"}>{menu.title}</div>
                <div className={"icon"}><Icon iconMui={"chevron_right"}/></div>
            </Button>
            <div className={"list"}>
                {
                    menu.list.map((item: any, key: React.Key) => {
                        return <Button buttonClass={"link"} key={key} className={"submenu"} href={item.href || "#"}>
                            <div className={"title"}>{item.title}</div>
                            {item.icon && <div className={"icon"}>{item.icon}</div>}
                        </Button>
                    })
                }
            </div>
        </MainBase>
    );
}

const MainBase = styled.div`
  border-radius: 6px;

  .menu {
    margin-bottom: 0 !important;

    .icon {
      transition: ease-in-out 0.2s;
    }
  }

  &.open {
    box-shadow: 0 0 4px 0 #6899d0;

    .menu {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: 1px #dee2e5 solid;

      &:hover {
        box-shadow: none;
      }

      .icon {
        transform: rotate(90deg);
      }
    }

    .list {
      max-height: unset;
    }
  }

  .list {
    background: #ffffffa8;
    max-height: 0;
    overflow: hidden;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;

    .submenu {
      display: flex;
      flex: 1;
      font-weight: 500;
      font-size: 0.9rem;
      letter-spacing: 0.05px;
      color: #5b7383;
      justify-content: flex-start;
      padding: 5px 5px 5px 30px;
      border-radius: 0;

      &.active {
        padding-left: 27px;
        border-left: 3px solid #6198bd;
        background: linear-gradient(#ffffff, #c1c6cb);
      }

      &:hover {
        background: linear-gradient(#ffffff, #c1c6cb);
      }

      .title {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }

`;
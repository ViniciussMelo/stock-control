import React from 'react';
import { AiOutlineBarcode } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";

export const SidebarData = [
    {
        title: 'Início',
        path: '/',
        icon: <FaShoppingCart />,
        cName: 'nav-text'
    },
    {
        title: 'Produtos',
        path: '/products',
        icon: <AiOutlineBarcode />,
        cName: 'nav-text'
    },
    {
        title: 'Entrada e saída',
        path: '/moviments',
        icon: <GiExitDoor />,
        cName: 'nav-text'
    },
]


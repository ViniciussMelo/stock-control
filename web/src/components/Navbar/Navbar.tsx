import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from 'react-icons';

import { SidebarData } from "./SidebarData";

import './styles.css';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const [toolbarTitle, setToolbarTitle] = useState('Início');

    const showSideBar = () => setSidebar(!sidebar);

    const handleLinkClick= (itemTitle: string) => {
        setToolbarTitle(itemTitle);
    }

    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        <FaBars onClick={showSideBar}/>
                    </Link>
                    <h1 className="text-title">{toolbarTitle}</h1>
                </div>

                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSideBar}>
                        <li className="navbar-toggle">
                            <Link to="#" className='menu-bars'>
                                <AiOutlineClose />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path} onClick={() => {handleLinkClick(item.title)}}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar;

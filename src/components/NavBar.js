import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import Icon from "./Icon";
import logo from "../img/logo120x60.png";


function NavBar() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    }

    const closeMobileMenu = () => {
        setShowMobileMenu(false);
    };

    return (
        <header className="bg-dark">
            <div className="logo-header">
                <img src={logo} alt="Logo Data For Future"/>
            </div>
            <nav className={`menu ${showMobileMenu ? 'show' : ''}`}>
                <ul>
                    <li>
                        <Link to="/" onClick={closeMobileMenu}>Home</Link>
                    </li>
                    <li>
                        <Link to="/episodes" onClick={closeMobileMenu}>Episodes</Link>
                    </li>
                    <li>
                        <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
                    </li>
                </ul>
            </nav>
<div className={`mobile-menu-icon ${showMobileMenu ? "" : "close"}`}  onClick={toggleMobileMenu}>
    <Icon icon={showMobileMenu ? <IoIosClose/> : <IoIosMenu/>} />
</div>
        </header>
    );
};

export default NavBar;
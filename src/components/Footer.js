import React from "react";
import logo from "../img/logo120x60.png";

function Footer() {
    return (
        <footer className="bg-dark">
            <div className="logo-footer">
                <img src={logo} alt="Logo Data For Future"/>
            </div>
            <p className="copyright">Copyright &copy; 2024 Data For Future</p>
        </footer>
    );
};

export default Footer;

import React from "react";
import logo from "./logo.svg"
import './logo.css'

export const Logo = () => {
    return (
        <a href="/">
            <img src={logo} alt="logo" className="logo-svg"/>
        </a>
    )
}
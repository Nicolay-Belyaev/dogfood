import React from "react";
import "./header.css"

import {Logo} from "../Logo/logo";
import {Search} from "../Search/search";


export const Header = (props) => {
    const setSearchQuery = (searchRequest) => {
        props.setSearch(searchRequest)
    }

    return (
        <div className="header">
            <div className="container">
                <div className="header__wrapper">
                    <Logo classname = 'logo' />
                    <Search setSearch={setSearchQuery} />
                </div>
            </div>
        </div>
        )
}
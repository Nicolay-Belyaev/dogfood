import React from "react";
import "./search.scss"

export const Search = ({ setSearch }) => {

    return (<input
                placeholder="search..."
                onChange={(e) => setSearch(e.target.value)}
                className="search__input"
            />)
}
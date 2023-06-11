import React from "react";
import {Route, Routes} from "react-router";

import {CatalogPage} from "../../pages/CatalogPage/catalogpage";
import {ProductPage} from "../../pages/ProductPage/productpage";
import {FavoritePage} from "../../pages/FavoritePage/favoritepage";

export const AuthorizedRouting = () => {
    return (<>
        <Routes>
            <Route path="/" element={<CatalogPage />}/>,
            <Route path="/product/:id" element={<ProductPage />}/>,
            <Route path="/favorites" element={<FavoritePage />}/>,
            <Route path="*" element={<div>404. Found nothing.</div>}/>
        </Routes>
    </>)

}
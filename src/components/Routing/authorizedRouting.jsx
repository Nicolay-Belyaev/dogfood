import React from "react";
import {Route, Routes} from "react-router";

import {CatalogPage} from "../../pages/CatalogPage/catalogpage";
import {ProductPage} from "../../pages/ProductPage/productpage";
import {FavoritePage} from "../../pages/FavoritePage/favoritepage";
import {BasketPage} from "../../pages/BasketPage/basketPage";
import {UserPage} from "../../pages/UserPage/userPage";
import {NotAuthorizedPage} from "../../pages/NotAuthorizedPage/notauthorizedpage";

export const AuthorizedRouting = () => {
    return (<>
        <Routes>
            <Route path="/" element={<CatalogPage />}/>,
            <Route path="/product/:id" element={<ProductPage />}/>,
            <Route path="/favorites" element={<FavoritePage />}/>,
            <Route path="/basket" element={<BasketPage />}/>
            <Route path="/profile" element={<UserPage />}/>
            <Route path="*" element={<div>404. Found nothing.</div>}/>
        </Routes>
    </>)

}
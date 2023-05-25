import React from "react";
import {Route, Routes} from "react-router";
import {CatalogPage} from "../../pages/CatalogPage/catalogpage";
import {ProductPage} from "../../pages/ProductPage/productpage";
import {FavoritePage} from "../../pages/FavoritePage/favoritepage";

//TODO: разделить доступ в зависимости от того, авторизован пользователь или нет
export const Routing = () => {
    return ( <>
        <Routes>
            <Route path="/" element={<CatalogPage />}/>,
            <Route path="/product/:id" element={<ProductPage />}/>,
            <Route path="/favorites" element={<FavoritePage />}/>,
            <Route path="*" element={<div>404. Found nothing.</div>}/>
        </Routes>
    </>)

}
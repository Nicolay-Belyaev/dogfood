import React, {useContext} from "react";

import {Cardlist} from "../../components/CardList/cardlist";
import {BackButton} from "../../components/BackButton/backbutton";
import {AppContext} from "../../context/appcontext";

export const FavoritePage = () => {
    const {favorites} = useContext(AppContext)

    return (
        <div className='favorites container'>
            <BackButton />
            <h1 className='favorites__title'>Избранное</h1>
            <Cardlist cards={favorites}/>
        </div>
    )
}
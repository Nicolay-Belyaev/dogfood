import React from "react";

import {Cardlist} from "../../CardList/cardlist";
import {BackButton} from "../../BackButton/backbutton";

export const FavoritePage = ({favorites, handleLike, user}) => {
    return (
        <div className='favorites container'>
            <BackButton />
            <h1 className='favorites__title'>Избранное</h1>
            <Cardlist cards={favorites} handleLike={handleLike} user={user}/>
        </div>
    )
}
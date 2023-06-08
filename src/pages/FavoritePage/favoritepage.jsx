import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import './favoritepage.css'

import {Cardlist} from "../../components/CardList/cardlist";
import {BackButton} from "../../components/Buttons/BackButton/backbutton";
import {ReactComponent as Like} from "../../components/Resourses/img/like.svg";

export const FavoritePage = () => {
    const favorites = useSelector((state) => state.cards.favorites)

    return (<div className='favorites_container'>
                <BackButton />
                <h1 className='favorites__title'>Избранное</h1>
                {!!favorites.length === false &&
                    <div className='no_favorites'>
                     <span>Вы пока ничего не добавили в Избранное.</span>
                     <span>Нажмите <Like /> у товара в <Link to={'/'}>Каталоге</Link> для добавления в Избранное.</span>
                    </div>
                }
                <Cardlist cards={favorites}/>
            </div>)
}
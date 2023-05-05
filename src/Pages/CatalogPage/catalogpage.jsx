import React, {useContext} from "react";

import './catalogpage.css';
import {Cardlist} from "../../components/CardList/cardlist";
import {AppContext} from "../../context/appcontext";
import {CHEAPEST, EXPENSIVE, NEWEST, POPULAR, SALE, RATE} from "../../constants/constants";

export const CatalogPage = () => {
    const {cards, search, onSort, handleLike} = useContext(AppContext)
    const changeWordEnd = (cardsLength) => {
        const leftover = cardsLength % 10;
        if (!cardsLength || !leftover || (leftover >= 5 && leftover < 9)) {return ' товаров.'}
        if (leftover > 1 && leftover < 5) {return ' товара.'}
        if (leftover === 1) {return ' товар.'}
    }

    const sortedItems = [
        {id: POPULAR, title: 'Популярные'},
        {id: CHEAPEST, title: 'Сначала дешевые'},
        {id: EXPENSIVE, title: 'Сначала дорогие'},
        {id: NEWEST, title: 'Новинки'},
        {id: SALE, title: 'Распродажа'},
        {id: RATE, title: 'По рейтингу'}
    ]

    return (
        <>
           <div className='sort-cards'>
                {sortedItems.map(e => <span className='sort-item' key={e.id} onClick={()=>onSort(e.id)}>{e.title} </span>)}
           </div>
           {search &&
               <p className='search'>
                   По запросу <b>{search}</b> {cards.length === 1 ? 'найден' : 'найдено'} <b>{cards.length}</b>{changeWordEnd(cards.length)}
               </p>}
            <Cardlist cards={cards} handleLike={handleLike} />
        </>

    )
}
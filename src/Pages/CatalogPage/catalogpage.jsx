import React, {useContext} from "react";
import {Cardlist} from "../../components/CardList/cardlist";
import './catalogpage.css';
import {AppContext} from "../../context/appcontext";

export const CatalogPage = () => {
    const {cards, search, onSort, handleLike} = useContext(AppContext)
    const changeWordEnd = (cardsLength) => {
        const leftover = cardsLength % 10;
        if (!cardsLength || !leftover || (leftover >= 5 && leftover < 9)) {return ' товаров.'}
        if (leftover > 1 && leftover < 5) {return ' товара.'}
        if (leftover === 1) {return ' товар.'}
    }

    const sortedIteams = [
        {id: 'popular', title: 'Популярные'},
        {id: 'cheapest', title: 'Сначала дешевые'},
        {id: 'most-expansive', title: 'Сначала дорогие'},
        {id: 'newest', title: 'Новинки'},
        {id: 'sale', title: 'Распродажа'}
    ]

    return (
        <>
           <div className='sort-cards'>
                {sortedIteams.map(e => <span className='sort-item' key={e.id} onClick={()=>onSort(e.id)}>{e.title} </span>)}
           </div>
           {search &&
               <p className='search'>
                   По запросу <b>{search}</b> {cards.length === 1 ? 'найден' : 'найдено'} <b>{cards.length}</b>{changeWordEnd(cards.length)}
               </p>}
            <Cardlist cards={cards} handleLike={handleLike} />
        </>

    )
}
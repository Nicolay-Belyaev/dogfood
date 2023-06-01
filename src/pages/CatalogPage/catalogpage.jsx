import React, {useContext} from "react";

import './catalogpage.css';
import {Cardlist} from "../../components/CardList/cardlist";
import {AppContext} from "../../context/appcontext";
import {CHEAPEST, EXPENSIVE, NEWEST, POPULAR, SALE, RATE} from "../../constants/constants";
import {changeWordEnd} from "../../utils/utils";
import {useSelector} from "react-redux";

export const CatalogPage = () => {
    const {search, onSort } = useContext(AppContext)
    const cards = useSelector((state) => state.cards.data.products)

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
                   По запросу <b>{search}</b> {cards.length === 1 ? 'найден' : 'найдено'} <b>{cards.length}</b>{changeWordEnd(cards.length, 'товар')}.
               </p>}
            <Cardlist cards={cards} />
        </>

    )
}
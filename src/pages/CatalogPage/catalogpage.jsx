import React, {useContext} from "react";

import './catalogpage.css';
import {Cardlist} from "../../components/CardList/cardlist";
import {AppContext} from "../../context/appcontext";
import {CHEAPEST, EXPENSIVE, NEWEST, POPULAR, SALE, RATE} from "../../constants/constants";
import {changeWordEnd} from "../../utils/utils";
import {useDispatch, useSelector} from "react-redux";
import {sortProducts} from '../../storage/slices/cardsSlice'

const sortedItems = [
    {id: POPULAR, title: 'Популярные'},
    {id: CHEAPEST, title: 'Сначала дешевые'},
    {id: EXPENSIVE, title: 'Сначала дорогие'},
    {id: NEWEST, title: 'Новинки'},
    {id: SALE, title: 'Распродажа'},
    {id: RATE, title: 'По рейтингу'}
]

export const CatalogPage = () => {
    const {search} = useContext(AppContext)
    const cards = useSelector((state) => state.cards.products)
    const dispatch = useDispatch()

    return (<>
           <div className='sort-cards'>
                {sortedItems.map(e => <span className='sort-item' key={e.id} onClick={()=>dispatch(sortProducts(e.id))}>{e.title}</span>)}
           </div>
           {search &&
               <p className='search'>
                   По запросу <b>{search}</b> {cards.length === 1 ? 'найден' : 'найдено'} <b>{cards.length}</b>{changeWordEnd(cards.length, 'товар')}.
               </p>}
            <Cardlist cards={cards} />
        </>)
}
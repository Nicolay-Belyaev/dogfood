import React from "react";
import {useDispatch, useSelector} from "react-redux";
import './catalogpage.css';

import {sortProducts} from '../../storage/slices/cardsSlice'
import {sortedItems} from "../../constants/constants";

import {changeWordEnd} from "../../utils/utils";
import {Cardlist} from "../../components/CardList/cardlist";

export const CatalogPage = () => {
    const search = useSelector(state => state.search.searchRequest)
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
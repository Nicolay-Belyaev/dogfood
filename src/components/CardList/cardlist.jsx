import React from "react";
import './cardlist.css'

import {Card} from '../Card/card'

export const Cardlist = ({cards}) => {

    return (<div className='cards'>
                 {cards.map((item) => {
                     return <Card key={item._id} {...item} product={item}/>
                 })}
            </div>)
}

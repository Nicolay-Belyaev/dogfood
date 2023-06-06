import React from "react";
import { Card } from '../Card/card'
import './cardlist.css'

export const Cardlist = ({cards}) => {

    return (
             <div className='cards'>
                 {cards.map((item) => {
                     return <Card key={item._id} {...item} product={item}/>
                 })}
             </div>
            )
}

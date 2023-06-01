import React from "react";
import { Card } from '../Card/card'
import './cardlist.css'
import {useSelector} from "react-redux";


export const Cardlist = ({cards}) => {

    return (cards !== undefined &&
             <div className='cards'>
                 {cards.map((item) => {
                     return <Card key={item._id} {...item} product={item}/>
                 })}
             </div>

    )
}

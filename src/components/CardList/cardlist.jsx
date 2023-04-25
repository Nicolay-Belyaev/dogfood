import React from "react";
import { Card } from '../Card/card'
import './cardlist.css'

export const Cardlist = ({ cards, userId, handleLike }) => {
     return (
        <div className='cards'>
            {cards.map((item) => {
                return <Card key={item._id} {...item} product={item} userId={userId} handleLike={handleLike}/>
            })}
        </div>
    )
}
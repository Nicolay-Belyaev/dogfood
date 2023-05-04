import React from "react";
import { Card } from '../Card/card'
import './cardlist.css'

export const Cardlist = ({ cards, user, handleLike }) => {
     return (
        <div className='cards'>
            {cards.map((item) => {
                return <Card key={item._id} {...item} product={item} user={user} handleLike={handleLike}/>
            })}
        </div>
    )
}
import React from "react";
import "./card.css";

import { ReactComponent as Like } from "./like.svg";

export const Card = ({ discount, picture, image, price, name, ...args }) => {
    return (
        <div className='card'>
            <div className='card__sticky card__sticky_type_top-left'>
                {!!discount && <span className='card__discount'>
                    -{discount}%
                </span> }
            </div>

            <div className='card__sticky card__sticky_type_top-right'>
                <Like />
            </div>
                <a href="/" className='card__link'>
                    <img src={picture ?? image} alt='food' className='card__image' />
                    <div className='card__desc'>
                        <span className='card__price'>{price}</span>
                        <span className='card__weight'>100g</span>
                    </div>
                    <p className='card__name'>{name}</p>
                </a>
            <span className='card__card btn btn_type_primary'>В корзину</span>
        </div>
    )
}
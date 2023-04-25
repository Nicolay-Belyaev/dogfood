import React, {useEffect} from "react";
import "./card.css";

import { ReactComponent as Like } from "./like.svg";
import {api} from "../../utils/api";

export const Card = ({ discount, pictures, image, price, name, wight, tags, likes, userId, product, handleLike }) => {
    const isLiked = likes.some(e => e === userId)
    const handelClick = () => {
        handleLike(product, isLiked)
    }

    return (
        <div className='card'>
            <div className='card__sticky card__sticky_type_top-left'>
                {!!discount && <span className='card__discount'>
                    -{discount}%
                </span> }
                {tags.map(e =>
                    <span className={`tag tag_type_${e}`} key={e}>
                        {e}
                    </span>)}
            </div>

            <div className='card__sticky card__sticky_type_top-right'>
                <button onClick={handelClick} className={`card__favorite ${isLiked ? 'card__favorite-active' : ''}`}>
                    <Like />
                </button>
            </div>

                <a href="/" className='card__link'>
                    <img src={pictures ?? image} alt='food' className='card__image' />
                    <div className='card__desc'>
                        <span className='card__price'>{price}</span>
                        <span className='card__weight'>{wight}</span>
                    </div>
                    <p className='card__name'>{name}</p>
                </a>
            <span className='card__card btn btn_type_primary'>В корзину</span>
        </div>
    )
}
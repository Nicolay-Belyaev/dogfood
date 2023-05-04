import React from "react";
import "./card.css";

import { ReactComponent as Like } from "./like.svg";
import {Link} from "react-router-dom";

export const Card = ({ discount, pictures, image, price, name, wight, tags, likes, user, product, handleLike }) => {
    const handleClick = () => {
        handleLike(product, isLiked)
    }
    const isLiked = likes.some(e => e === user._id)
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
                <button onClick={handleClick} className={`card__favorite ${isLiked ? 'card__favorite-active' : ''}`}>
                    <Like />
                </button>
            </div>

                <Link to={`/product/${product._id}`} className='card__link'>
                    <img src={pictures ?? image} alt='food' className='card__image' />
                    <div className='card__desc'>
                        <span className='card__price'>{price}</span>
                        <span className='card__weight'>{wight}</span>
                    </div>
                    <p className='card__name'>{name}</p>
                </Link>
            <span className='card__card btn btn_type_primary'>В корзину</span>
        </div>
    )
}
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import cn from "classnames";
import s from './index.module.scss'

import {Rating} from "../Rating/rating";
import {Reviews} from "../Reviews/reviews";
import {BackButton} from "../Buttons/BackButton/backbutton";
import {BasketButton} from "../Buttons/BasketButton/basketButton";
import {changeWordEnd, getDiscountPrice, productRating} from "../../utils/utils";

import {ReactComponent as Like} from "../Resourses/img/like.svg";
import {ReactComponent as Truck} from "../Resourses/img/truck.svg";

export const Product = ({product, onProductLike, sendReview, onDeleteReview}) => {
    const [isProductLiked, setIsProductLiked] = useState(false)
    const user = useSelector((state) => state.user.data)

    const handleClick = () => {
        onProductLike(product, isProductLiked)
    }
    const onSendReview = (data) => {
        sendReview(data)
    }
    useEffect(() => {
        const isLiked = product.likes.some(e => e === user?._id);
        setIsProductLiked(isLiked)
    }, [product.likes, user]);

    return (
        <div className={`${s.product} container`}>

            <div className={s.titleWrapper}>
                <BackButton/>
                <span className={s.productTitle}>{product.name}</span>
                <div>
                    <span>Артикул:</span>
                    <Rating rating={productRating(product)}/>
                    <span>{product.reviews.length}{changeWordEnd(product.reviews.length, 'отзыв')}</span>
                </div>
            </div>

            <div className={s.productInfo}>
                <div className={s.imgWrapper}>
                    <img className={s.img} src={product.pictures} alt={''}/>
                </div>
                <div className={s.desc}>
                    <span className={`${s.price} ${!!product.discount ? s.oldPrice : ''}`}>{product.price}&nbsp;р</span>
                    {
                        !!product.discount &&
                        <span
                            className={`${s.price} ${s.newPrice}`}>{getDiscountPrice(product.discount, product.price)}&nbsp;p</span>
                    }

                    <div className={s.controls}>
                        <BasketButton product={product}/>
                    </div>
                    <div>
                        <button className={cn(s.favorite, {[s.favoriteActive]: isProductLiked})} onClick={handleClick}>
                            <Like/>
                            <span>{isProductLiked ? 'В избранном' : 'В избранное'}</span>
                        </button>
                    </div>

                    <div className={s.delivery}>
                        <Truck/>
                        <div>
                            <span className={s.desc}>Доставка курьером по всему миру!</span>
                            <p className={s.text}>Доставка курьером - от 399 ₽</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={s.desc}>
                <span className={s.price}>Описание</span>
                <span>{product.description}</span>
            </div>
            <Reviews onDeleteReview={onDeleteReview} onSendReview={onSendReview} reviews={product.reviews} />
        </div>
    )
}
import React, {useContext, useEffect, useState} from "react";
import cn from "classnames";

import s from './index.module.scss'
import {AppContext} from "../../context/appcontext";

import {BackButton} from "../Buttons/BackButton/backbutton";
import {Rating} from "../Rating/rating";
import {changeWordEnd, productRating} from "../../utils/utils";
import {BaseButton} from "../Buttons/BaseButton/basebutton";
import {ReactComponent as Like} from "../Resourses/img/like.svg";
import {ReactComponent as Truck} from "../Resourses/img/truck.svg";
import {Reviews} from "../Reviews/reviews";
import {useSelector} from "react-redux";

export const Product = ({product, onProductLike, sendReview, onDeleteReview}) => {
    const [isProductLiked, setIsProductLiked] = useState(false)
    const user = useSelector((state) => state.user.data)

    const getDiscountPrice = (discount, price) => {
        return (price - Math.floor(price * discount / 100)).toFixed(0)
    }
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

            {/*TODO: Доделать иконки кнопок, дописать логику изменения значения при нажатии + / -*/}
                    <div className={s.controls}>
                        <div className={s.controls__cart__left}>
                            <span className={s.controls__cart__minus}>-</span>
                            <span className={s.controls__cart__num}>0</span>
                            <span className={s.controls__cart__plus}>+</span>
                        </div>
                        <BaseButton>В корзину</BaseButton>
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
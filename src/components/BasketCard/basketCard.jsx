import React from "react";
import s from './index.module.scss'
import {useDispatch} from "react-redux";
import {addToBasket, removeFromBasket} from "../../storage/slices/basketSlice";
import {getDiscountPrice} from "../../utils/utils";

export const BasketCard = ({product, pictures, name, wight, amountInBasket, price, discount, }) => {
    const dispatch = useDispatch()

    return (
        <div className={s.container}>

            <div className={s.description}>
                <img src={pictures} alt='pict' className={s.img}/>
                <div className={s.text}>
                    <span className={s.name}>{name}</span>
                    <span className={s.weight}>{wight}</span>
                </div>
            </div>

            <div className={s.controls}>
                <div className={s.selector}>
                    <span onClick={() => dispatch(addToBasket(product))}>+ </span>
                    {amountInBasket} шт.
                    <span onClick={() => dispatch(removeFromBasket(product))}>  - </span>
                </div>
                <div className={s.price}>
                    {discount?
                        <div className={s.price_discount}>
                            <div className={s.oldPrice}>{price * product.amountInBasket} ₽ </div>
                            <div className={s.discount}>{getDiscountPrice(discount, price) * product.amountInBasket} ₽</div>
                        </div> :
                        <span className={s.fullprice}>
                            {price * product.amountInBasket} ₽
                        </span>}
                </div>
            </div>

        </div>
    )
}
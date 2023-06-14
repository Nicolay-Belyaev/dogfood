import React from "react";
import s from './index.module.scss'
import {useDispatch} from "react-redux";
import {addToBasket, removeFromBasket} from "../../storage/slices/basketSlice";

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
                    {price} RUR
                </div>
            </div>

        </div>
    )
}
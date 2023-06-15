import React from "react";
import {useSelector} from "react-redux";
import {BasketCard} from "../../components/BasketCard/basketCard";
import s from './index.module.scss'

export const BasketPage = () => {
    const cardsInBasket = useSelector(state => state.basket.basket)
    const productsInBasket = cardsInBasket.reduce((accum, product) => accum + product.amountInBasket, 0)
    const totalConstInBasket = cardsInBasket.reduce((accum, product) => accum + product.amountInBasket * product.price, 0)

    return (<>
            {!!productsInBasket &&
                <p className={s.container}>
                    {productsInBasket} товаров в корзине.
                </p>}

            <div className={s.container}>
                <div className={s.products}>
                    {cardsInBasket.map((item) => {
                        return <BasketCard key={item._id} {...item} product={item}/>
                    })}
                </div>
                <div className={s.total}>
                    <span>Ваша корзина</span>
                    <div className={s.price}>
                        <span>Товары ({productsInBasket})</span>
                        <span>{totalConstInBasket}</span>
                    </div>
                    <div className={s.discount}>
                        <span>Скидка</span>
                        <span></span>
                    </div>

                </div>
            </div>
            </>)
}

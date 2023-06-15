import React from "react";
import {useSelector} from "react-redux";
import {BasketCard} from "../../components/BasketCard/basketCard";
import s from './index.module.scss'
import {getDiscountPrice} from "../../utils/utils";
import {BaseButton} from "../../components/Buttons/BaseButton/basebutton";

export const BasketPage = () => {
    const cardsInBasket = useSelector(state => state.basket.basket)
    const productsInBasket = cardsInBasket.reduce((accum, product) =>
                                  accum + product.amountInBasket, 0)
    const costInBasket = cardsInBasket.reduce((accum, product) =>
                                  accum + product.amountInBasket * product.price, 0)
    const totalDiscount = costInBasket - cardsInBasket.reduce((accum, product) =>
                                  accum + product.amountInBasket * getDiscountPrice(product.discount, product.price), 0)

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
                        <span>{costInBasket} ₽</span>
                    </div>
                    <div className={s.price}>
                        <span>Скидка</span>
                        <span>-{totalDiscount} ₽</span>
                    </div>
                    <div className={s.price}>
                        <span>Общая стоимость</span>
                        <span>{costInBasket - totalDiscount} ₽</span>
                    </div>
                    <BaseButton children='Оформить заказ'/>
                </div>
            </div>
            </>)
}

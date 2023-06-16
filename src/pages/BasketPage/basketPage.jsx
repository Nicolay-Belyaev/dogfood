import React from "react";
import {useSelector} from "react-redux";
import {BasketCard} from "../../components/BasketCard/basketCard";
import s from './index.module.scss'
import {changeWordEnd, getDiscountPrice} from "../../utils/utils";
import {BaseButton} from "../../components/Buttons/BaseButton/basebutton";
import cn from "classnames";

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
                <div className={s.productsCounter}>
                    {productsInBasket} {changeWordEnd(productsInBasket,"товар")}
                    <span className={s.productsCounter__end}> в корзине.</span>
                </div>}

            <div className={s.container}>

                <div className={s.products}>
                    {cardsInBasket.map((item) => {
                        return <BasketCard key={item._id} {...item} product={item}/>
                    })}
                </div>

                <div className={s.checkout}>
                    <span className={s.checkout__title}>Ваша корзина</span>
                    <div className={s.checkout__line}>
                        <span className={s.checkout__tagName}>Товары ({productsInBasket})</span>
                        <span>{costInBasket}&nbsp;₽</span>
                    </div>
                    <div className={s.checkout__line}>
                        <span className={s.checkout__tagName}>Скидка</span>
                        <span className={cn(
                            {[s.red]: !!totalDiscount})}>
                            {!!totalDiscount && <span>-</span>} {totalDiscount}&nbsp;₽
                        </span>
                    </div>
                    <div className={s.checkout__line}>
                        <span className={cn(s.checkout__title, s.size)}>Общая стоимость</span>
                        <span>{costInBasket - totalDiscount}&nbsp;₽</span>
                    </div>
                    <BaseButton children='Оформить заказ'/>
                </div>
            </div>
            </>)
}

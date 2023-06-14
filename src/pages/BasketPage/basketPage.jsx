import React from "react";
import {useSelector} from "react-redux";
import {BasketCard} from "../../components/BasketCard/basketCard";
import s from './index.module.scss'

export const BasketPage = () => {
    const cardsInBasket = useSelector(state => state.basket.basket)

    return (
                <div className={s.container}>
                    {cardsInBasket.map((item) => {
                        return <BasketCard key={item._id} {...item} product={item}/>
                    })}
                    <hr></hr>
                </div>
            )
}
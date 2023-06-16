import React from "react";
import s from './index.module.scss'
import {useDispatch} from "react-redux";
import {addToBasket, purgeFromBasket, removeFromBasket} from "../../storage/slices/basketSlice";
import {getDiscountPrice} from "../../utils/utils";

import {ReactComponent as Basket} from "../Resourses/img/basket.svg";
import {ReactComponent as ArrowLeft} from "../Resourses/img/arrow-left.svg";
import {ReactComponent as ArrowRight} from "../Resourses/img/arrow-right.svg";

export const BasketCard = ({product, pictures, name, wight, amountInBasket, price, discount, }) => {
    const dispatch = useDispatch()

    return (
        <div className={s.product}>

            <div className={s.description}>
                <img src={pictures} alt='pict' className={s.img}/>
                <div className={s.description__text}>
                    <div className={s.name}>{name}</div>
                    <div className={s.wight}>{wight}</div>
                </div>
            </div>

            <div className={s.controls}>
                <div className={s.selector}>
                    <span onClick={() => dispatch(removeFromBasket(product))}><ArrowLeft className={s.arrow}/></span>
                    <span className={s.amountInBasket}>{amountInBasket}</span>
                    <span onClick={() => dispatch(addToBasket(product))}><ArrowRight className={s.arrow}/></span>
                </div>
                <div className={s.price}>
                    {discount?
                        <div className={s.price__discount}>
                            <div className={s.oldPrice}>{price * product.amountInBasket}&nbsp;₽ </div>
                            <div className={s.discount}>{getDiscountPrice(discount, price) * product.amountInBasket}&nbsp;₽</div>
                        </div> :
                        <div className={s.fullprice}>
                            {price * product.amountInBasket}&nbsp;₽
                        </div>}
                </div>
                <div className={s.basket}>
                    <Basket onClick={() => dispatch(purgeFromBasket(product))}/>
                </div>
            </div>

        </div>
    )
}
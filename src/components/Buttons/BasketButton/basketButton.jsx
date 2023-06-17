import React, {useState} from "react";

import s from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {addToBasket, removeFromBasket} from "../../../storage/slices/basketSlice";

import {ReactComponent as ArrowLeft} from "../../Resourses/img/arrow-left.svg";
import {ReactComponent as ArrowRight} from "../../Resourses/img/arrow-right.svg";

export const BasketButton = ({product}) => {
    const dispatch = useDispatch()
    const basket = useSelector(state => state.basket.basket)
    const getAmountOfProductInBasket = (product) => {
        for (let i = 0; i < basket.length; i++) {
            if (basket[i]._id === product._id) {
                return basket[i].amountInBasket
            }
        }
    }
    const [mode, setMode] = useState(!!getAmountOfProductInBasket(product) ? 'selector' : 'button')

    const changeAppearance = () => {
        mode === 'button' ? setMode('selector') : setMode('button')
    }

    const buttonModeAction = (product) => {
        dispatch(addToBasket(product))
        changeAppearance()
    }

    const selectorArrowLeftAction = () => {
        dispatch(removeFromBasket(product))
        if (getAmountOfProductInBasket(product) === 1) {
            changeAppearance()
        }
    }
    const selectorArrowRightAction = () => {
        dispatch(addToBasket(product))
    }

    return (<>
                {mode === 'button'
                    ?
                    <button onClick={() => buttonModeAction(product)} className={s.btn} >
                        В корзину
                    </button>
                    :
                    <div className={s.selector}>
                        <span><ArrowLeft onClick={selectorArrowLeftAction} className={s.arrow}/></span>
                            <span className={s.amountInBasket}>{getAmountOfProductInBasket(product)}</span>
                        <span><ArrowRight onClick={selectorArrowRightAction} className={s.arrow}/></span>
                    </div>
                }
            </>)


}
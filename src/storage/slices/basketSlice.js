import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    basket: JSON.parse(localStorage.getItem('basket')) || [],
    allProductsAmount: 0
}

const calcAllAmountFunc = (state) => {
    state.allProductsAmount = state.basket.reduce((accum, product) => accum + product.amountInBasket, 0)
}

const basketSlice = createSlice({
    name: "basket",
    initialState: initialState,
    reducers: {
        addToBasket: (state, {payload}) => {
            for (let i = 0; i < state.basket.length; i++) {
                if (state.basket[i]._id === payload._id) {
                    state.basket[i].amountInBasket++
                    calcAllAmountFunc(state)
                    return
                }
            }
            state.basket.push({...payload, amountInBasket: 1})
            calcAllAmountFunc(state)
        },
        removeFromBasket: (state, {payload}) => {
            for (let i = 0; i < state.basket.length; i++) {
                if (state.basket[i]._id === payload._id) {
                    state.basket[i].amountInBasket--
                    if (state.basket[i].amountInBasket < 1) {
                        state.basket.splice(i, 1)
                        calcAllAmountFunc(state)
                        }
                    }
                }
        },
        purgeFromBasket: (state, {payload}) => {
            state.basket = state.basket.filter((productInBasket) => productInBasket._id !== payload._id)
            calcAllAmountFunc(state)
        },
        calcAllAmount: (state) => {
            calcAllAmountFunc(state)
        }
    }
})

export default basketSlice.reducer

export const {addToBasket, removeFromBasket, purgeFromBasket, calcAllAmount} = basketSlice.actions
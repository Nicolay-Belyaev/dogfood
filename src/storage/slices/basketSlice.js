import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    basket: []
}


const basketSlice = createSlice({
    name: "basket",
    initialState: initialState,
    reducers: {
        addToBasket: (state, {payload}) => {
            for (let i = 0; i < state.basket.length; i++) {
                if (state.basket[i][0]._id === payload._id) {
                    state.basket[i][1].amountInBasket++
                    return
                }
            }
            const productInBasket = [payload, {amountInBasket: 1}]
            state.basket.push(productInBasket)
        },
        removeFromBasket: (state, {payload}) => {
            for (let i = 0; i < state.basket.length; i++) {
                if (state.basket[i][0]._id === payload._id) {
                    state.basket[i][1].amountInBasket--
                    if (state.basket[i][1].amountInBasket < 1) {
                        state.basket.splice(i, 1)
                    }
                    }
                }
        }
    }
})

export default basketSlice.reducer

export const {addToBasket} = basketSlice.actions
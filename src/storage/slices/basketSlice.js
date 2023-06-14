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
                if (state.basket[i]._id === payload._id) {
                    state.basket[i].amountInBasket++
                    return
                }
            }
            state.basket.push({...payload, amountInBasket: 1})
        },
        removeFromBasket: (state, {payload}) => {
            for (let i = 0; i < state.basket.length; i++) {
                if (state.basket[i]._id === payload._id) {
                    state.basket[i].amountInBasket--
                    if (state.basket[i].amountInBasket < 1) {
                        state.basket.splice(i, 1)
                    }
                    }
                }
        }
    }
})

export default basketSlice.reducer

export const {addToBasket, removeFromBasket} = basketSlice.actions
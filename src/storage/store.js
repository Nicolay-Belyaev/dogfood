import {configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import cardsSlice from "./slices/cardsSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        cards: cardsSlice
    }
})
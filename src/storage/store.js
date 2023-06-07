import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import cardsSlice from "./slices/cardsSlice";
import modalSlice from "./slices/modalSlice";

    const customMiddleware = getDefaultMiddleware({
    serializableCheck: false
    }
)

export const store = configureStore({
    reducer: {
        user: userSlice,
        cards: cardsSlice,
        modal: modalSlice
    },
    middleware: customMiddleware
})
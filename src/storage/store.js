import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import cardsSlice from "./slices/cardsSlice";
import modalSlice from "./slices/modalSlice";
import searchSlice from "./slices/searchSlice";
import basketSlice from "./slices/basketSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        cards: cardsSlice,
        modal: modalSlice,
        search: searchSlice,
        basket: basketSlice
    }
})
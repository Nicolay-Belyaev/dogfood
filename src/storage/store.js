import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import cardsSlice from "./slices/cardsSlice";
import modalSlice from "./slices/modalSlice";
import searchSlice from "./slices/searchSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        cards: cardsSlice,
        modal: modalSlice,
        search: searchSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    searchRequest: undefined
}

const searchSlice = createSlice({
    name: "search",
    initialState: initialState,
    reducers: {
        changeSearchRequest: (state, {payload}) => {
            state.searchRequest = payload
        }
    }
})

export default searchSlice.reducer
export const {changeSearchRequest} = searchSlice.actions
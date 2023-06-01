import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../utils/api";

const initialState = {
    data: [],
    loading: false
}

const Loading = (data) => {return data.type.endsWith("pending")}
const Error = (data) => {return data.type.endsWith("rejected")}

export const getCards = createAsyncThunk(
    "getCards",
    async function() {
        return await api.getProductList()
    }
)


const cardsSlice = createSlice({
    name: "cards",
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(getCards.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        })
        builder.addMatcher(Loading, (state, action) => {
            state.loading = true
        })
        builder.addMatcher(Error, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default cardsSlice.reducer
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../utils/api";

const initialState = {
    data: {},
    loading: false
}
export const getUser = createAsyncThunk(
    "getUser",
    async function() {
        return await api.getUserInfo()
        }
    )

const Error = (data) => {return data.type.endsWith("rejected")}

const Loading = (data) => {return data.type.endsWith("pending")}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.loading = false
        })
        builder.addMatcher(Error, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addMatcher(Loading, (state, action) => {
            state.loading = true
        })
    }
})

export default userSlice.reducer
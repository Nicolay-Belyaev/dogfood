import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userApi} from "../../api/userApi";

const initialState = {
    data: {},
    loading: false
}
export const getUser = createAsyncThunk(
    "getUser",
    async function() {
        return await userApi.getUserInfo()
        }
    )

const Error = (data) => {return data.type.endsWith("rejected")}
const Loading = (data) => {return data.type.endsWith("pending")}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state, {payload}) => {
            state.data = payload
            state.loading = false
        })
        builder.addMatcher(Loading, (state) => {
            state.loading = true
        })
        builder.addMatcher(Error, (state, {payload}) => {
            state.loading = false
            state.error = payload
        })
    }
})

export default userSlice.reducer
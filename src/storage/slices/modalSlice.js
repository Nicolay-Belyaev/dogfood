import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    modalShow: false,
    modalChildren: "register"
}

const modalSlice = createSlice({
    name: "modal",
    initialState: initialState,
    reducers: {
        changeModalShow: (state, {payload}) => {
            state.modalShow = payload
        },
        changeModalChilder: (state, {payload}) => {
            state.modalChildren = payload
        }
    }
})

export default modalSlice.reducer
export const {changeModalChilder, changeModalShow} = modalSlice.actions
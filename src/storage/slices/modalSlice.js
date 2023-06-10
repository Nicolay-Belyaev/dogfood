import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    modalShow: false,
    modalChildrenPointer: "register"
}

const modalSlice = createSlice({
    name: "modal",
    initialState: initialState,
    reducers: {
        changeModalShow: (state, {payload}) => {
            state.modalShow = payload
        },
        changeModalChilderPointer: (state, {payload}) => {
            state.modalChildrenPointer = payload
        }
    }
})

export default modalSlice.reducer
export const {changeModalChilderPointer, changeModalShow} = modalSlice.actions
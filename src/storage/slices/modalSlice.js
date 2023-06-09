import {createSlice} from "@reduxjs/toolkit";
import {Register} from "../../components/Auth/AuthModals/register";

const initialState = {
    modalShow: false,
    modalChildren: <Register/>
}
    //TODO: переделать с прослойкой через Map что бы убрать из стейта non-serializble значение
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
import React from "react";
import {useDispatch} from "react-redux";

import {api} from "../../../utils/api";
import {changeModalChilder} from "../../../storage/slices/modalSlice";

import {FormFields} from "../FormFields";
import {Login} from "./login";

export const ResetPass = () => {
    const dispatch = useDispatch()

    const userAlert = (apiResponse) => {
        if (apiResponse.hasOwnProperty("message")) {
            alert(apiResponse.message)
        } else {
            alert(`Пароль для пользователя с логином ${apiResponse.data.email} успешно изменен.`)
        }
    }
    const submitSequence = async (data) => {
        const passwordResetApiResponse = await api.resetPassword(data, localStorage.getItem("dogfood_token"))
        userAlert(passwordResetApiResponse)
        dispatch(changeModalChilder(<Login/>))
    }

    return (<>
        <div className='login'>
            <h3 className='_header'>Восстановление пароля</h3>
            <FormFields
                submitSequence={submitSequence}
                submitButtonText='Отправить'
                changeModalFormButtonText = 'Я вспомнил пароль'
                changeModalFormOn={<Login/>}
                showEmailField = {false}/>
                showPasswordFields={{
                    passwordInput: true,
                    passwordResetButton: false
                }}
        </div>
    </>)
}
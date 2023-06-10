import React from "react";
import {useDispatch} from "react-redux";

import {authApi} from "../../../api/authApi";
import {changeModalChilder} from "../../../storage/slices/modalSlice";

import {FormFields} from "../FormFields";

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
        const passwordResetApiResponse = await authApi.resetPassword(data, localStorage.getItem("dogfood_token"))
        userAlert(passwordResetApiResponse)
        dispatch(changeModalChilder("login"))
    }

    return (<>
                <div className='login'>
                    <h3 className='_header'>Восстановление пароля</h3>
                    <FormFields
                        submitSequence={submitSequence}
                        submitButtonText='Отправить'
                        changeModalFormButtonText = 'Я вспомнил пароль'
                        changeModalFormOn={"login"}
                        showEmailField = {false}/>
                        showPasswordFields={{
                            passwordInput: true,
                            passwordResetButton: false
                        }}
                </div>
            </>)
}
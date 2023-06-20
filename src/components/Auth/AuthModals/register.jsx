import React from "react";
import {useDispatch} from "react-redux";

import {authApi} from "../../../api/authApi";
import {changeModalChilderPointer} from "../../../storage/slices/modalSlice";
import {FormFields} from "../FormFields";

export const Register = () => {
    const dispatch = useDispatch()

    const userAlert = (apiResponse) => {
        if (apiResponse.hasOwnProperty("message")) {
            alert(apiResponse.message)
        } else {
            alert(`Пользователь c логинов ${apiResponse.email} успешно зарегистрирован.`)
            dispatch(changeModalChilderPointer("login"))
        }
    }

    const submitSequence = async (data) => {
        const registerApiResponse = await authApi.sighUp(data)
        userAlert(registerApiResponse)
    }

    return (<div className='login'>
                <h3 className='_header'>Регистрация</h3>
                    <FormFields
                       submitSequence={submitSequence}
                       submitButtonText='Зарегистрироваться'
                       changeModalFormButtonText = 'Войти'
                       changeModalFormOn={"login"}
                       showPasswordFields={{
                           passwordInput: true,
                           passwordResetButton: false
                       }}
                    />
            </div>)
}
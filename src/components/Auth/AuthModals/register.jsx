import React from "react";
import {useDispatch} from "react-redux";

import {api} from "../../../utils/api";
import {changeModalChilder} from "../../../storage/slices/modalSlice";

import {FormFields} from "../FormFields";
import {Login} from "./login";

export const Register = () => {
    const dispatch = useDispatch()

    const userAlert = (apiResponse) => {
        if (apiResponse.hasOwnProperty("message")) {
            alert(apiResponse.message)
        } else {
            alert(`Пользователь c логинов ${apiResponse.email} успешно зарегистрирован.`)
            dispatch(changeModalChilder(<Login/>))
        }
    }

    const submitSequence = async (data) => {
        const registerApiResponse = await api.sighUp(data)
        userAlert(registerApiResponse)
    }

    return (
        <div className='login'>
            <h3 className='_header'>Регистрация</h3>
           <FormFields
               submitSequence={submitSequence}
               submitButtonText='Зарегистрироваться'
               changeModalFormButtonText = 'Войти'
               changeModalFormOn={<Login/>}
               showPasswordFields={{
                   passwordInput: true,
                   passwordResetButton: false
               }}
           />
        </div>
    )
}
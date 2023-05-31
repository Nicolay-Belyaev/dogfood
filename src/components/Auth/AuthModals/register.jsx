import React, {useContext} from "react";
import {api} from "../../../utils/api";
import {Login} from "./login";
import {FormFields} from "../FormFields";
import {AppContext} from "../../../context/appcontext";

export const Register = () => {
    const {setModalChildren} = useContext(AppContext)

    const userAlert = (apiResponse) => {
        if (apiResponse.hasOwnProperty("message")) {
            alert(apiResponse.message)
        } else {
            sessionStorage.setItem('current_user_mail', apiResponse.email)
            alert(`Пользователь c логинов ${apiResponse.email} успешно зарегистрирован.`)
            setModalChildren(<Login/>)
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
import React from "react";
import {api} from "../../../utils/api";
import {Login} from "./login";
import {FormFields} from "../FormFields";

export const Register = () => {
    const submitSequence = async (data) => {
        try {
            return await api.sighUp(data)
        } catch (error) {
            alert("Что-то пошло не так. Смотри консоль для подробностей.")
            console.log(error)
        }
    }
    const showPasswordFields = {
        passwordInput: true,
        passwordResetButton: false
    }

    return (
        <div className='login'>
            <h3 className='_header'>Регистрация</h3>
           <FormFields
               submitSequence={submitSequence}
               submitButtonText='Зарегистрироваться'
               changeModalFormButtonText = 'Войти'
               changeModalFormOn={<Login/>}
               showPasswordFields={showPasswordFields}
           />
        </div>
    )
}
import React, {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import {AppContext} from "../../../context/appcontext";
import {api} from "../../../utils/api";
import {Login} from "./login";
import {FormFields} from "../FormFields";

const emailRequirements = {
    required: {
        value: true,
        message: 'Пожалуйста, укажите e-mail.'
    },
    pattern: {
        value: /^([A-Za-z\d.]+)@[A-Za-z\d.]+\.([A-Za-z]+)$/,
        message: "Похоже, вы ошиблись в e-mail."
    }
}

const passwordRequirements = {
    required: {
        value: true,
        message: 'Пожалуйста, задайте пароль.'
    },
    pattern: {
        value: /^[A-Za-z\d]{8,}$/,
        message: 'Пароль должен содержать не менее 8 символов и состоять из цифр и букв латинского алфавита.'
    }
}

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
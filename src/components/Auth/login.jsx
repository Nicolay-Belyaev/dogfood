import React from "react";
import './index.modules.scss'
import {api} from "../../utils/api";
import {FormFields} from "./auth_components/FormFields";
import {Register} from "./register";

export const Login = () => {
    const submitSequence = async (data) => {
        console.log(data)
        const userInfo = await api.sighIn(data)
        localStorage.setItem('dogfood_token', userInfo.token)
    }
    const showPasswordFields = {
        passwordInput: true,
        passwordResetButton: false
    }

    return (
        <div className='login'>
            <h3 className='_header'>Вход</h3>
            <FormFields
                submitSequence={submitSequence}
                submitButtonText='Войти'
                changeModalFormButtonText = 'Регистрация'
                changeModalFormOn={<Register/>}
                showPasswordFields={showPasswordFields}/>

        </div>
    )
}
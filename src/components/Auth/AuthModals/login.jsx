import React from "react";
import {useDispatch} from "react-redux";
import '../index.modules.scss'

import {api} from "../../../utils/api";
import {changeModalShow} from "../../../storage/slices/modalSlice";

import {FormFields} from "../FormFields";

export const Login = () => {
    const dispatch = useDispatch()
    const userAlert = () => {
        if (localStorage.getItem('dogfood_token') !== 'undefined') {
            alert("Вы успешно авторизовались.")
            dispatch(changeModalShow(false))
        } else {
            alert('Не получилось авторизоваться. Возможно, вы ошиблись в логине и/или пароле.')
        }
    }
    const submitSequence = async (data) => {
        const userInfo = await api.sighIn(data)
        localStorage.setItem('dogfood_token', userInfo.token)
        userAlert()
    }

    return (<div className='login'>
                <h2 className='_header'>Вход</h2>
                <FormFields
                    submitSequence={submitSequence}
                    submitButtonText='Войти'
                    changeModalFormButtonText='Регистрация'
                    changeModalFormOn={"register"}
                    showPasswordFields={{
                        passwordInput: true,
                        passwordResetButton: true
                    }}
                />
            </div>)
}
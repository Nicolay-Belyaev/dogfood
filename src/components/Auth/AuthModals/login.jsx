import React, {useContext} from "react";
import '../index.modules.scss'
import {api} from "../../../utils/api";
import {FormFields} from "../FormFields";
import {Register} from "./register";
import {AppContext} from "../../../context/appcontext";

export const Login = () => {
    const {setIsAuthorized, setModalShow} = useContext(AppContext)
    const userAlert = () => {
        if (localStorage.getItem('dogfood_token') !== 'undefined') {
            setIsAuthorized(true)
            alert("Вы успешно авторизовались.")
            setModalShow(false)
        } else {
            alert('Не получилось авторизоваться. Возможно, вы ошиблись в логине и/или пароле.')
        }
    }
    const submitSequence = async (data) => {
        const userInfo = await api.sighIn(data)
        localStorage.setItem('dogfood_token', userInfo.token)
        userAlert()
    }

    return (
        <div className='login'>
            <h2 className='_header'>Вход</h2>
            <FormFields
                submitSequence={submitSequence}
                submitButtonText='Войти'
                changeModalFormButtonText='Регистрация'
                changeModalFormOn={<Register/>}
                showPasswordFields={{
                    passwordInput: true,
                    passwordResetButton: true
                }}
            />
        </div>
    )
}
import React, {useContext} from "react";
import {api} from "../../../utils/api";
import {FormFields} from "../FormFields";
import {Login} from "./login";
import {AppContext} from "../../../context/appcontext";

export const ResetPass = () => {
    const {setModalChildren} = useContext(AppContext)

    const submitSequence = async (data) => {
        await api.resetPassword(data, localStorage.getItem("dogfood_token")).then(
            res => {alert(`Пароль для аккаунат ${res.email} успешно изменен`)}
        )
        setModalChildren(<Login/>)
    }

    const showPasswordFields = {
        passwordInput: true,
        passwordResetButton: false
    }
    return (<>
        <div className='login'>
            <h3 className='_header'>Восстановление пароля</h3>
            <FormFields
                submitSequence={submitSequence}
                submitButtonText='Отправить'
                changeModalFormButtonText = 'Я вспомнил пароль'
                changeModalFormOn={<Login/>}
                showPasswordFields={showPasswordFields}
                showEmailField = {false}/>
        </div>
    </>)
}
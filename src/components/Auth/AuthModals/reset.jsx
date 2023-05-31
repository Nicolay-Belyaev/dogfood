import React, {useContext, useState} from "react";

import {api} from "../../../utils/api";
import {AppContext} from "../../../context/appcontext";

import {FormFields} from "../FormFields";
import {Login} from "./login";
import {ResetPass} from "./resetpass";

export const Reset = () => {
    const [showTokenField, setShowTokenField] = useState(false)
    const {setModalChildren} = useContext(AppContext)

    const userAlert = (apiResponse) => {
        switch (apiResponse.message) {
            case "На сервере произошла ошибка":
                alert(`${apiResponse.message}. Скорее всего вы ошиблись в email.`)
                return false
            case "Письмо успешно отправлено":
                alert(apiResponse.message)
                return true
            default:
                alert("На сервере произошло что-то непредвиденное.")
                break
        }
    }

    const submitSequence = async (data) => {
        if (data.token === undefined) {
            const tokenResetApiResponse = await api.resetToken(data)
            setShowTokenField(userAlert(tokenResetApiResponse))
        }
        else {
            localStorage.setItem("dogfood_token", data.token)
            setModalChildren(<ResetPass />)
        }
    }

    return (<>
        <div className='login'>
            <h3 className='_header'>Восстановление пароля</h3>
            <FormFields
                submitSequence={submitSequence}
                submitButtonText='Отправить'
                changeModalFormButtonText = 'Я вспомнил пароль'
                changeModalFormOn={<Login/>}
                showPasswordFields={{
                    passwordInput: false,
                    passwordResetButton: false}}
                showTokenField={showTokenField}/>
        </div>
        <span>Срок действия временного пароля 24 ч.</span>
    </>)
}
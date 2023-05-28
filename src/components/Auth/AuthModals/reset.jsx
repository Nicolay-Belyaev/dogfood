import React, {useContext, useEffect, useState} from "react";

import {api} from "../../../utils/api";
import {AppContext} from "../../../context/appcontext";

import {FormFields} from "../FormFields";
import {Login} from "./login";
import {ResetPass} from "./resetpass";

export const Reset = () => {
    const [resetTokenResponse, setResetTokenResponse] = useState({})
    const [showTokenField, setShowTokenField] = useState(false)
    const {setModalChildren} = useContext(AppContext)

    const submitSequence = async (data) => {
        if (data.token === undefined) {
            setResetTokenResponse(await api.resetToken(data))
        }
        else {
            localStorage.setItem("dogfood_token", data.token)
            setModalChildren(<ResetPass />)
        }
    }

    const showPasswordFields = {
        passwordInput: false,
        passwordResetButton: false
    }

    useEffect(() => {
        //TODO: переделать на уведомление если апи не отработал.
        // Срабатывает при первом рендере, потому что initialState == {}
        if (resetTokenResponse.message === "Письмо успешно отправлено") {
            setShowTokenField(true)}
        else {
            console.log(("Что-то пошло не так. возможно указана неправильная почта"))
        }
    }, [resetTokenResponse])

    return (<>
        <div className='login'>
            <h3 className='_header'>Восстановление пароля</h3>
            <FormFields
                submitSequence={submitSequence}
                submitButtonText='Отправить'
                changeModalFormButtonText = 'Я вспомнил пароль'
                changeModalFormOn={<Login/>}
                showPasswordFields={showPasswordFields}
                showTokenField={showTokenField}/>
        </div>
        <span>Срок действия временного пароля 24 ч.</span>
    </>)
}
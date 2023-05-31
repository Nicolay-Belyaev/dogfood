import React, {useContext} from "react";
import {api} from "../../../utils/api";
import {FormFields} from "../FormFields";
import {Login} from "./login";
import {AppContext} from "../../../context/appcontext";

export const ResetPass = () => {
    const {setModalChildren} = useContext(AppContext)

    const userAlert = (apiResponse) => {
        if (apiResponse.hasOwnProperty("message")) {
            alert(apiResponse.message)
        } else {
            alert(`Пароль для пользователя с логином ${apiResponse.data.email} успешно изменен.`)
        }
    }
    const submitSequence = async (data) => {
        const passwordResetApiResponse = await api.resetPassword(data, localStorage.getItem("dogfood_token"))
        userAlert(passwordResetApiResponse)
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
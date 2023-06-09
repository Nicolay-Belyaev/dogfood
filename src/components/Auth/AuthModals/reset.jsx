import React, {useState} from "react";
import {useDispatch} from "react-redux";

import {authApi} from "../../../api/authApi";
import {changeModalChilderPointer} from "../../../storage/slices/modalSlice";

import {FormFields} from "../FormFields";

export const Reset = () => {
    const [showTokenField, setShowTokenField] = useState(false)
    const dispatch = useDispatch()

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
            const tokenResetApiResponse = await authApi.resetToken(data)
            setShowTokenField(userAlert(tokenResetApiResponse))
        }
        else {
            localStorage.setItem("dogfood_token", data.token)
            dispatch(changeModalChilderPointer("resetPassword"))
        }
    }

    return (<>
                <div className='login'>
                    <h3 className='_header'>Восстановление пароля</h3>
                    <FormFields
                        submitSequence={submitSequence}
                        submitButtonText='Отправить'
                        changeModalFormButtonText = 'Я вспомнил пароль'
                        changeModalFormOn={"login"}
                        showPasswordFields={{
                            passwordInput: false,
                            passwordResetButton: false}}
                        showTokenField={showTokenField}/>
                </div>
                <span>Срок действия временного пароля 24 ч.</span>
            </>)
}
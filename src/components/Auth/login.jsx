import React, {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import './index.modules.scss'
import {api} from "../../utils/api";
import {AppContext} from "../../context/appcontext";
import {Reset} from "./reset";
import {Register} from "./register";

// TODO: стили
//

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
export const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'})
    const {setModalChildren} = useContext(AppContext)
    const [type, setType] = useState(true)

    const submitSequence = async (data) => {
        const userInfo = await sendData(data)
        localStorage.setItem('dogfood_token', userInfo.token)
    }

    const sendData = async (data) => {
        try {
            return await api.sighIn(data)
        } catch (error) {
            alert("Что-то пошло не так. Смотри консоль для подробностей.")
            console.log(error)
        }
    }

    return (
        <div className='login'>
            <h3 className='_header'>Вход</h3>
            <form className='login__form' onSubmit={handleSubmit(submitSequence)}>
                <div className='login__inputs'>
                    <input
                        className='login__form-input'
                        type='text'
                        placeholder='email'
                        {...register('email', {...emailRequirements})}
                    />
                    {errors?.email &&
                        <div className='error_message'>{errors.email.message}</div>}
                    <input
                        className='login__form-input'
                        type={!type ? 'password' : 'text'}
                        placeholder='password'
                        {...register('password', {...passwordRequirements})}
                    />
                    <span
                        onClick={() => setType(!type)}
                        className='login__form-passToggler'>
                        {type ? 'X' : 'O'}
                    </span>
                    {errors?.password &&
                        <div className='error_message'>{errors.password.message}</div>}
                </div>
                <div className='buttons'>
                    <div onClick={() => setModalChildren(<Reset/>)}>Восстановить пароль</div>
                    <button className='button__yellow' type='submit'>Войти</button>
                    <button className='button__blank' onClick={() => setModalChildren(<Register/>)}>Регистрация</button>
                </div>
            </form>
        </div>
    )
}
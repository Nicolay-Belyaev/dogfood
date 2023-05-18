import React from "react";
import { useForm } from "react-hook-form";
import './login.scss'

// TODO: обработка и визуализация ошибок ввода
//       работа с API
//       стили
export const Login = () => {
    const {register, handleSubmit} = useForm({mode: 'onBlur'})

    const sendData = (data) => {
        console.log(data)
        // TODO: тут будет вызов API. Зачем мне отдельная функция? Можно вызвать API в handleSubmit
    }

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
            message: 'Пароль должен содержать не менее 8 символов и состоять из цифр и букв латинского алфавита'
        }
    }

    return (
        <div className='login'>
            <h3 className='_header'>Вход</h3>
            <form className='login__form' onSubmit={handleSubmit(sendData)}>
                <div className='login__inputs'>
                    <input className='login__form-input' type='text' {...register('email', {...emailRequirements})} placeholder='email'/>
                    <input className='login__form-input' type='text' {...register('passwrod', {...passwordRequirements})} placeholder='password'/>
                </div>
            </form>
            <div className='reset'>Восстановить пароль</div>
            <div className='buttons'>
                <button className='button__yellow'>Войти</button>
                <button className='button__blank'>Регистрация</button>
            </div>

        </div>
    )
}
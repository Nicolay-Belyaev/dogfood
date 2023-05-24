import React from "react";
import {useForm} from "react-hook-form";
import '../index.modules.scss'
import {api} from "../../../utils/api";

// TODO: обработка и визуализация ошибок ввода
//       работа с API
//       стили
export const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'})

    const sendData = async (data) => {
        try {
            const userInfo = await api.sighIn(data)
            localStorage.setItem('dogfood_token', userInfo.token)
        } catch (error) {
            alert("Что-то пошло не так. Смотри консоль для подробностей.")
            console.log(error)
        }
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
            message: 'Пароль должен содержать не менее 8 символов и состоять из цифр и букв латинского алфавита.'
        }
    }

    return (
        <div className='login'>
            <h3 className='_header'>Вход</h3>
            <form className='login__form' onSubmit={handleSubmit(sendData)}>
                <div className='login__inputs'>
                    <input className='login__form-input' type='text' {...register('email', {...emailRequirements})} placeholder='email'/>
                    {errors?.email && <div className='error_message'>{errors.email.message}</div>}
                    <input className='login__form-input' type='text' {...register('password', {...passwordRequirements})} placeholder='password'/>
                    {errors?.password && <div className='error_message'>{errors.password.message}</div>}
                </div>
                <div className='buttons'>
                    <div>Восстановить пароль</div>
                    <button className='button__yellow' type='submit'>Войти</button>
                    <button className='button__blank'>Регистрация</button>
                </div>
            </form>
        </div>
    )
}
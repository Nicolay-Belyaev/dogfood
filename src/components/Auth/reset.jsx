import React from "react";
import {useForm} from "react-hook-form";

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
export const Reset = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'})

    const sendData = async (data) => {
        try {
            console.log('Тут будет вызов API')
            // const userInfo = await api.resetPassword(data)
        } catch (error) {
            alert("Что-то пошло не так. Смотри консоль для подробностей.")
            console.log(error)
        }
    }

    return (
        <div className=''>
            <div className=''>X</div>
            <span>Восстановление пароля</span>
            <span>Для получения временного пароля необходимо ввести email, указанный при регистрации.</span>
            <form className='' onSubmit={handleSubmit(sendData)}>
                <input
                    className='login__form-input'
                    type='text'
                    placeholder='email'
                    {...register('email', {...emailRequirements})}
                />
                {errors?.email &&
                    <div className='error_message'>{errors.email.message}</div>}
                <span>Срок действия временного пароля 24 ч.</span>
                <button className='button__yellow' type='submit'>Отправить</button>
            </form>
        </div>
    )
}
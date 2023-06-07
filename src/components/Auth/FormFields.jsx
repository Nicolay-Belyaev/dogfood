import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";

import {changeModalChilder} from "../../storage/slices/modalSlice";
import {Reset} from "./AuthModals/reset";

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

export const FormFields = ({showEmailField = true, ...props}) => {
    const {showTokenField, submitSequence, submitButtonText, showPasswordFields, changeModalFormButtonText, changeModalFormOn} = props
    const dispatch = useDispatch()
    const {handleSubmit, register, formState: {errors}} = useForm({mode: 'onBlur'})

    const [type, setType] = useState(true)

    return (
    <form className='login__form' onSubmit={handleSubmit(submitSequence)}>
        <div className='login__inputs'>

        {showEmailField && <>
        <input
            className='login__form-input'
            type='text'
            placeholder='email'
            {...register('email', {...emailRequirements})}
        />
        {errors?.email && <div className='error_message__email'>{errors.email.message}</div>}
        </>}

        {showTokenField && <>
        <input
            className='login__form-input'
            type={'text'}
            placeholder='token'
            {...register('token', {})}
        />
            <span>Введите полученный в письме токен</span>
        </>}

        {showPasswordFields.passwordInput &&
        <><input
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
        {errors?.password && <div className='error_message__password'>{errors.password.message}</div>}
        </>}

        </div>
        <div className='buttons'>
            {showPasswordFields.passwordResetButton && <div onClick={() => dispatch(changeModalChilder(<Reset/>))}>Восстановить пароль</div>}
            <button className='button__yellow' type='submit'>{submitButtonText}</button>
            <button className='button__blank' onClick={() => dispatch(changeModalChilder(changeModalFormOn))}>{changeModalFormButtonText}</button>
        </div>
    </form>
    )
}
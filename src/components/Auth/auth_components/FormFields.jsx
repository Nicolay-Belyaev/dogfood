import React, {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import {Reset} from "../reset";
import {AppContext} from "../../../context/appcontext";

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

export const FormFields = (props) => {
    const {submitSequence, submitButtonText, showPasswordFields,changeModalFormButtonText, changeModalFormOn} = props
    const {setModalChildren} = useContext(AppContext)
    const {handleSubmit, register, formState: {errors}} = useForm({mode: 'onBlur'})

    const [type, setType] = useState(true)

    return (
    <form className='login__form' onSubmit={handleSubmit(submitSequence)}>
    <div className='login__inputs'>

        <input
            className='login__form-input'
            type='text'
            placeholder='email'
            {...register('email', {...emailRequirements})}
        />
        {errors?.email && <div className='error_message'>{errors.email.message}</div>}

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
        {errors?.password && <div className='error_message'>{errors.password.message}</div>}
        </>}

    </div>
        <div className='buttons'>
            {showPasswordFields.passwordResetButton && <div onClick={() => setModalChildren(<Reset/>)}>Восстановить пароль</div>}
            <button className='button__yellow' type='submit'>{submitButtonText}</button>
            <button className='button__blank' onClick={() => setModalChildren(changeModalFormOn)}>{changeModalFormButtonText}</button>
        </div>
    </form>
    )
}
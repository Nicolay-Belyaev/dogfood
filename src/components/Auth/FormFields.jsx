import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";

import {changeModalChilderPointer} from "../../storage/slices/modalSlice";
import {emailRequirements, passwordRequirements} from "../../constants/constants";

export const FormFields = ({showEmailField = true, ...props}) => {
    const dispatch = useDispatch()
    const {showTokenField, submitSequence, submitButtonText, showPasswordFields, changeModalFormButtonText, changeModalFormOn} = props
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
            {showPasswordFields.passwordResetButton && <div onClick={() => dispatch(changeModalChilderPointer("resetToken"))}>Восстановить пароль</div>}
            <button className='button__yellow' type='submit'>{submitButtonText}</button>
            <button className='button__blank' onClick={() => dispatch(changeModalChilderPointer(changeModalFormOn))}>{changeModalFormButtonText}</button>
        </div>
    </form>
    )
}
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import s from "./index.module.scss";
import {BaseButton} from "../Buttons/BaseButton/basebutton";
import {getUser, setAuthorized} from "../../storage/slices/userSlice";
import {userApi} from "../../api/userApi";
import {ReactComponent as Edit} from '../Resourses/img/edit.svg'

export const UserDescription = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.data)
    const {handleSubmit, register, reset} = useForm({mode: 'onBlur'})

    const [descriptionInputShow, setDescriptionInputShow] = useState(false)
    const Logout = () => {
        localStorage.clear()
        dispatch(setAuthorized(false))
    }

    const submitSequence = async (data) => {
        await userApi.changeUserInfo(data)
        dispatch(getUser())
        setDescriptionInputShow(false)
        reset()
    }

    return (
        <div className={s.container}>
            <div className={s.text}>
                <div className={s.block}>
                    <div className={s.line}>{user.name}</div>
                </div>
                <div className={s.block}>
                    <div className={s.line__description}>{user.about}</div>
                </div>
                <div className={s.block}>
                    <div className={s.line__description}>{user.email}</div>
                </div>
                <Edit className={s.edit} onClick={() => setDescriptionInputShow(!descriptionInputShow)}/>
            </div>
            <div className={s.logout}>
                <BaseButton children='Выйти из учетной записи' onClick={Logout}/>
            </div>
            {descriptionInputShow &&
                <form className={s.form} onSubmit={handleSubmit(submitSequence)}>
                    <input
                        className={s.form__input}
                        type='text'
                        placeholder='введите имя'
                        {...register('name')}
                    />
                    <input
                        className={s.form__input}
                        type='text'
                        placeholder='введите описание'
                        {...register('about')}
                    />
                    <BaseButton children='Отправить' type='submit'/>
                </form>
            }
        </div>
    )
}


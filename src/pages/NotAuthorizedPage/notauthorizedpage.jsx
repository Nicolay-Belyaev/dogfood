import React from "react";
import {useDispatch} from "react-redux";
import {changeModalChilderPointer, changeModalShow} from "../../storage/slices/modalSlice";
import s from './index.module.scss'

//TODO: сделать стили
export const NotAuthorizedPage = () => {
    const dispatch = useDispatch()

    const activeModalAuthorization = () => {
        dispatch(changeModalShow(true))
    }

    const activeModalRegistration = () => {
        dispatch(changeModalChilderPointer('register'))
        dispatch(changeModalShow(true))
    }

    return (
        <div className={s.container}>
            <div className={s.line}>
                Что бы воспользоваться сайтом, пожалуйста,
                <span className={s.line__link} onClick={activeModalAuthorization}> авторизуйтесь</span>.
            </div>
            <div className={s.line}>
                Если вы еще не зарегистрированы, воспользуйтесь
                <span className={s.line__link}  onClick={activeModalRegistration}> формой регистрации</span>.
            </div>
        </div>

    )
}
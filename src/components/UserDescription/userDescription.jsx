import React from "react";
import {useDispatch, useSelector} from "react-redux";
import s from "./index.module.scss";
import {ReactComponent as Edit} from '../Resourses/img/edit.svg'
import {BaseButton} from "../Buttons/BaseButton/basebutton";
import {useNavigate} from "react-router";
import {setAuthorized} from "../../storage/slices/userSlice";
import {changeModalShow} from "../../storage/slices/modalSlice";

export const UserDescription = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.data)


    const Logout = () => {
        localStorage.clear()
        dispatch(setAuthorized(false))
        navigate('/not-authorized')
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
                <Edit className={s.edit}/>
            </div>
            <div className={s.logout}>
                <BaseButton children='Выйти из учетной записи' onClick={Logout}/>
            </div>
        </div>
    )
}


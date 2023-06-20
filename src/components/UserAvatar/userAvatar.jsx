import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import s from "./index.module.scss";
import {BaseButton} from "../Buttons/BaseButton/basebutton";
import {userApi} from "../../api/userApi";
import {getUser} from "../../storage/slices/userSlice";
import {ReactComponent as Edit} from '../Resourses/img/edit.svg'

export const UserAvatar = () => {
    const user = useSelector(state => state.user.data)
    const dispatch = useDispatch()
    const {handleSubmit, register, reset} = useForm({mode: 'onBlur'})

    const [avatarInputShow, setAvatarInputShow] = useState(false)
    const submitSequence = async (data) => {
        await userApi.changeUserAvatar(data)
        dispatch(getUser())
        setAvatarInputShow(false)
        reset()
    }

    return (
    <div className={s.avatar}>
        <img src={user.avatar} alt={'user-pic'} className={s.img}/>
        <Edit className={s.edit} onClick={() => setAvatarInputShow(!avatarInputShow)}/>
        {avatarInputShow &&
            <form onSubmit={handleSubmit(submitSequence)} className={s.form}>
                <input
                    className={s.avatar__input}
                    type='text'
                    placeholder='вставьте ссылку на новый аватар'
                    {...register('avatar')}
                />
                <BaseButton children='Ок' type='submit'/>
            </form>
        }
    </div>
    )
}



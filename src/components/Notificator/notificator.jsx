import React from "react";
import s from "./index.module.scss"
import {useDispatch} from "react-redux";

export const Notificator = (image, text) => {
    const dispatch = useDispatch()

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.image}>
                    <img src={image} alt='smile'/>
                </div>
                <div className={s.text}>
                    <span>{text}</span>
                </div>
                <div className={s.close}>
                    <span>X</span>
                </div>
            </div>
        </div>
    )
}
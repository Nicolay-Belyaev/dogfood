import React, {useContext, useState} from "react";
import s from "./index.module.scss"

import {Rating} from "../Rating/rating";
import {useForm} from "react-hook-form";
import {AppContext} from "../../context/appcontext";
import {BaseButton} from "../Button/basebutton";
import {ReactComponent as Basket} from "../Resourses/img/basket.svg";

const timeOptions = {
    day: 'numeric',
    month: 'short', year: "numeric"
}

export const Reviews = ({reviews, onSendReview, onDeleteReview}) => {
    const [showForm, setShowForm] = useState(false)
    const [rate, setRate] = useState()

    const {register, handleSubmit, reset} = useForm({mode: "onBlur"})
    const {user} = useContext(AppContext)

    const reviewRegister = {
        required: {
            value: true,
            message: "Обязательное поле"
        }
    }

    const onSendFromReview = ({text}) => {
        onSendReview({text, rating: rate})
        reset()
        setShowForm(false)
    }

    return (<>
            <div className={s.reviews}>
                <div className={s.reviews__controls}>
                    <span className={""}>Отзывы</span>
                    <BaseButton onClick={() => setShowForm(true)}>Оставить отзыв</BaseButton>
                </div>

                {showForm &&
                    <form className={s.reviews__form} onSubmit={handleSubmit(onSendFromReview)}>
                        <Rating rating={rate} setRate={setRate} mutable={true}/>
                        <textarea {...register('text', reviewRegister)} placeholder={"Ваш отзыв..."}/>
                        <button type='submit' className='btn btn_type_primary'>Отправить</button>
                    </form>}

                <div className={s.reviews__list}>
                    <div className={s.reviews__hr}/>
                    {reviews
                        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                        .map((e) =>
                            <div key={e._id}>
                                <div className={s.reviews__item}>
                                    <div className={s.reviews__author}>
                                        <span>{e.author.name}</span>
                                        <span className={s.reviews__date}>{new Date(e.created_at).toLocaleString('ru-RU', timeOptions)}</span>
                                        {user?._id === e.author._id &&
                                            <Basket onClick={() => onDeleteReview(e._id)} className={s.reviews__basket}/>}
                                    </div>
                                    <div className={s.rate}>
                                        <Rating rating={e.rate}/>
                                    </div>
                                    <div className={s.text}>{e.text}</div>
                                </div>
                                <div className={s.reviews__hr}/>
                            </div>)
                    }
                    </div>
            </div>
        </>
    )
}
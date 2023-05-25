import React from "react";
import {useNavigate} from "react-router";
import "./backbutton.css"

export const BackButton = () => {
    const navigate = useNavigate()

    return (
        <span onClick={() => navigate(-1)} className='navigate_back'>{'<'} Назад</span>
    )
}
import React from "react";
import {useNavigate} from "react-router";

export const BackButton = () => {
    const navigate = useNavigate()

    return (
        <span onClick={() => navigate(-1)} className='navigate_back'> {'<'} Назад</span>
    )
}
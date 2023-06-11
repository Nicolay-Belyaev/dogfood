import React from "react";
import {useDispatch} from "react-redux";
import {changeModalChilderPointer, changeModalShow} from "../../storage/slices/modalSlice";

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
        <div>
            <div>
                Что бы воспользоваться сайтом, пожалуйста,
                <span onClick={activeModalAuthorization}> авторизуйтесь</span>.
            </div>
            <div>
                Если вы еще не зарегистрированы, воспользуйтесь формой
                <span onClick={activeModalRegistration}> регистрации</span>.
            </div>
        </div>

    )
}
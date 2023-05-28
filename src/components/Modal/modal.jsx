import React, {useCallback, useContext, useEffect} from "react";
import s from './index.module.scss'
import {AppContext} from "../../context/appcontext";
import {Login} from "../Auth/AuthModals/login";
import {Register} from "../Auth/AuthModals/register";


export const Modal = ({ children }) => {
    const {modalShow, setModalShow, setModalChildren} = useContext(AppContext)

    const escapeSequence = () => {
        setModalChildren(<Register/>)
        setModalShow(false)
    }
    const escapeClose = useCallback((event) => {
        if (event.key === 'Escape') {
            escapeSequence()
        }
    }, [])

    useEffect(() => {
        if (modalShow) {
            document.addEventListener('keydown', escapeClose)
            return
        }
        document.removeEventListener('keydown', escapeClose)
    }, [modalShow])

    return (modalShow &&
            <div className={s.container}>
                <div className={s.modal}>
                    <div className={s.modal__close} onClick={escapeSequence}>X</div>
                    {children}
                </div>
            </div>
            )
}

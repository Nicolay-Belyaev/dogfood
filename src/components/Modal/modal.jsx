import React, {useCallback, useContext, useEffect} from "react";
import s from './index.module.scss'
import {AppContext} from "../../context/appcontext";


export const Modal = ({ children }) => {
    const {modalShow, setModalShow} = useContext(AppContext)

    const escapeClose = useCallback((event) => {
        if (event.key === 'Escape') {
            setModalShow(false)
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
                    <div className={s.modal__close} onClick={() => setModalShow(false)}>X</div>
                    {children}
                </div>
            </div>
            )
}

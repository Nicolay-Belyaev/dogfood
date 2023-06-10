import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import s from './index.module.scss'

import {changeModalChilder, changeModalShow} from "../../storage/slices/modalSlice";
import {Register} from "../Auth/AuthModals/register";
import {Login} from "../Auth/AuthModals/login";
import {Reset} from "../Auth/AuthModals/reset";
import {ResetPass} from "../Auth/AuthModals/resetpass";

export const Modal = () => {
    const dispatch = useDispatch()
    const modalShow = useSelector(state => state.modal.modalShow)
    const childrenPointer = useSelector(state => state.modal.modalChildren)

    const escapeSequence = () => {
        dispatch(changeModalChilder("register"))
        dispatch(changeModalShow(false))
    }
    const escapeClose = useCallback((event) => {
        if (event.key === 'Escape') {
            escapeSequence()
        }
    }, [])

    const childrenSwitcher = useCallback((childrenPointer) => {
        switch (childrenPointer) {
            case "register": return <Register/>
            case "login": return <Login/>
            case "resetToken": return <Reset/>
            case "resetPassword": return <ResetPass/>
            default: return
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
                    {childrenSwitcher(childrenPointer)}
                </div>
            </div>)
}

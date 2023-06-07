import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import s from './index.module.scss'

import {changeModalChilder, changeModalShow} from "../../storage/slices/modalSlice";
import {Register} from "../Auth/AuthModals/register";

export const Modal = () => {
    const modalShow = useSelector(state => state.modal.modalShow)
    const children = useSelector(state => state.modal.modalChildren)
    const dispatch = useDispatch()

    const escapeSequence = () => {
        dispatch(changeModalChilder(<Register/>))
        dispatch(changeModalShow(false))
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

import React, {useCallback, useContext, useEffect} from "react";
import './modal.scss'
import {AppContext} from "../../context/appcontext";


export const Modal = () => {
    const {modalShow, setModalShow} = useContext(AppContext)

    const escapeClose = useCallback((event) => {
        if (event.key === 'Escape') {
            setModalShow(false)
        }
    }, [setModalShow])

    useEffect((modal) => {
        if (modalShow) {
            return document.addEventListener('keydown', escapeClose)
        }
        document.removeEventListener('keydown', escapeClose)
    }, [escapeClose, modalShow])

    return (modalShow &&
            <div className='modal__container'>
                <div className='modal'>
                    <div className='modal_content'>
                        <span onClick={() => setModalShow(false)}>Click</span>
                    </div>
                </div>
            </div>
            )
}

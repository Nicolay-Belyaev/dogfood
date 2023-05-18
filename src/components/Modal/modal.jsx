import React, {useCallback, useContext, useEffect} from "react";
import './modal.scss'
import {AppContext} from "../../context/appcontext";


export const Modal = ({ children }) => {
    const {modalShow, setModalShow} = useContext(AppContext)

    const escapeClose = useCallback((event) => {
        if (event.key === 'Escape') {
            setModalShow(false)
            console.log('escape')
        }
    }, [])

    useEffect(() => {
        if (modalShow) {
            document.addEventListener('keydown', escapeClose)
        }
        document.removeEventListener('keydown', escapeClose)
    }, [modalShow])

    return (modalShow &&
            <div className='_container'>
                <div className='modal'>
                    <div className='modal__close' onClick={() => setModalShow(false)}>X</div>
                    {children}
                </div>
            </div>
            )
}

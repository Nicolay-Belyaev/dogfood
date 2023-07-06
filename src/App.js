import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router";

import {getUser} from "./storage/slices/userSlice";
import {getProducts} from "./storage/slices/cardsSlice";
import {calcAllAmount} from "./storage/slices/basketSlice";
import {changeModalShow} from "./storage/slices/modalSlice";

import {Header} from "./components/Header/header";
import {Footer} from "./components/Footer/footer";
import {Modal} from "./components/Modal/modal";
import {AuthorizedRouting} from "./components/Routing/authorizedRouting";
import {NotAuthorizedRouting} from "./components/Routing/notAuthorizedRouting";

export function App() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authorized = useSelector(state => state.user.authorized)
    const basket = useSelector(state => state.basket.basket)

    useEffect(() => {
        if (authorized) {
            dispatch(getUser())
                .then(() => dispatch(getProducts()))
            navigate("/")
        } else {
            dispatch(changeModalShow(true))
        }
    }, [authorized])

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(basket))
        dispatch(calcAllAmount())
    }, [basket])

    return (<div className='App'>
                <Modal/>
                <Header/>
                    <main className='container'>
                        {authorized ? <AuthorizedRouting/> : <NotAuthorizedRouting/>}
                    </main>
                <Footer/>
            </div>)
}
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"

import {getUser} from "./storage/slices/userSlice";
import {getProducts} from "./storage/slices/cardsSlice";

import {Header} from "./components/Header/header";
import {Footer} from "./components/Footer/footer";
import {Modal} from "./components/Modal/modal";
import {AuthorizedRouting} from "./components/Routing/AuthorizedRouting";
import {useNavigate} from "react-router";
import {NotAuthorizedRouting} from "./components/Routing/NotAuthorizedRouting";

export function App() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authorized = useSelector(state => state.user.authorized)

    useEffect(() => {
        if (authorized) {
            dispatch(getUser())
                .then(() => dispatch(getProducts()))
            navigate("/")
        } else {
            navigate('/not-authorized')
        }
    }, [authorized])

    return (<div className='App'>
                <Modal/>
                <Header/>
                    <main className='container'>
                        {authorized? <AuthorizedRouting/> : <NotAuthorizedRouting/>}
                    </main>
                <Footer/>
            </div>)
}
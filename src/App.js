import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"

import {getUser} from "./storage/slices/userSlice";
import {getProducts} from "./storage/slices/cardsSlice";

import {Header} from "./components/Header/header";
import {Footer} from "./components/Footer/footer";
import {Modal} from "./components/Modal/modal";
import {Routing} from "./components/Routing/routing";

export function App() {
    const dispatch = useDispatch()
    const authorized = useSelector(state => state.user.authorized)

    useEffect(() => {
        dispatch(getUser())
            .then(() => dispatch(getProducts()))
    }, [dispatch, authorized])

    return (<div className='App'>
                <Modal/>
                <Header/>
                    <main className='container'>
                        <Routing/>
                    </main>
                <Footer/>
            </div>)
}
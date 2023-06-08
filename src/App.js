import React, {useEffect} from "react";
import {useDispatch} from "react-redux"

import {getUser} from "./storage/slices/userSlice";
import {getProducts} from "./storage/slices/cardsSlice";

import {Header} from "./components/Header/header";
import {Footer} from "./components/Footer/footer";
import {Modal} from "./components/Modal/modal";
import {Routing} from "./components/Routing/routing";

export function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
            .then(() => dispatch(getProducts()))
    }, [dispatch])

    return (<div className='App'>
                <Modal/>
                <Header/>
                    <main className='container'>
                        <Routing/>
                    </main>
                <Footer/>
            </div>)
}
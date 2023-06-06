import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux"

import {Header} from "./components/Header/header";
import {Footer} from "./components/Footer/footer";
import {Modal} from "./components/Modal/modal";
import {Routing} from "./components/Routing/routing";

import {useDebounce} from "./hooks/hooks";
import {AppContext} from "./context/appcontext";

import {Register} from "./components/Auth/AuthModals/register";
import {getUser} from "./storage/slices/userSlice";
import {getProducts, searchProductByRequest} from "./storage/slices/cardsSlice";

export function App() {
    const [search, setSearch] = useState(undefined);
    const [modalChildren, setModalChildren] = useState(<Register/>)
    const [isAuthorized, setIsAuthorized] = useState(false)

    const [modalShow, setModalShow] = useState(false)
    const debounceValueInApp = useDebounce(search, 350)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
            .then(() => dispatch(getProducts()))
    }, [dispatch])


    useEffect(() => {
        if (debounceValueInApp === undefined) return;
        dispatch(searchProductByRequest(debounceValueInApp))
    }, [debounceValueInApp, dispatch])


    const contextCarrier
        = {setIsAuthorized, isAuthorized, modalShow, setModalShow, setModalChildren, search, setSearch};


    return (
        <AppContext.Provider value={contextCarrier}>
        <div className='App'>
            <Modal children={modalChildren}/>
            <Header />
            <main className='container'>
                <Routing />
            </main>
            <Footer />
        </div>
        </AppContext.Provider>
    )
}
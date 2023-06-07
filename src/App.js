import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux"

import {getUser} from "./storage/slices/userSlice";
import {getProducts, searchProductByRequest} from "./storage/slices/cardsSlice";
import {AppContext} from "./context/appcontext";

import {Header} from "./components/Header/header";
import {Footer} from "./components/Footer/footer";
import {Modal} from "./components/Modal/modal";
import {Routing} from "./components/Routing/routing";

import {useDebounce} from "./hooks/hooks";

export function App() {
    const [search, setSearch] = useState(undefined);
    const [isAuthorized, setIsAuthorized] = useState(false)
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

    const contextCarrier = {setIsAuthorized, isAuthorized, search, setSearch};

    return (
        <AppContext.Provider value={contextCarrier}>
        <div className='App'>
            <Modal />
            <Header />
            <main className='container'>
                <Routing />
            </main>
            <Footer />
        </div>
        </AppContext.Provider>
    )
}
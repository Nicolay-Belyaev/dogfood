import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux"

import {api} from "./utils/api";
import {likedByCurrentUser, productRating} from "./utils/utils";

import {Header} from "./components/Header/header";
import {Footer} from "./components/Footer/footer";
import {Modal} from "./components/Modal/modal";
import {Routing} from "./components/Routing/routing";

import {useDebounce} from "./hooks/hooks";
import {AppContext} from "./context/appcontext";

import {CHEAPEST, EXPENSIVE, NEWEST, POPULAR, SALE, RATE} from "./constants/constants";
import {Register} from "./components/Auth/AuthModals/register";
import {getUser} from "./storage/slices/userSlice";
import {getCards} from "./storage/slices/cardsSlice";

export function App() {
    const {data: userData} = useSelector((state) => state.user)
    const cards = useSelector((state) => state.cards.data.products)
    console.log(cards)
    const [search, setSearch] = useState(undefined);
    const [favorites, setFavorites] = useState([])
    const [modalChildren, setModalChildren] = useState(<Register/>)
    const [isAuthorized, setIsAuthorized] = useState(false)

    const [modalShow, setModalShow] = useState(false)
    const debounceValueInApp = useDebounce(search, 350)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
        dispatch(getCards())
    }, [dispatch])


    // const handleLike = useCallback(async (product, wasLiked) => {
    //     const updatedCard = await api.changeLike(product._id, wasLiked);
    //     setCards(s => [...s.map(e => e._id === updatedCard?._id ? updatedCard : e)]);
    //
    //     wasLiked ?
    //         setFavorites((prevState) => prevState.filter(f => f._id !== updatedCard._id))
    //         :
    //         setFavorites((prevState) => [updatedCard, ...prevState])
    //     return wasLiked;
    // }, [])

    // const onSort = (sortKey) => {
    //     switch (sortKey) {
    //         case POPULAR:
    //             return setCards([...cards.sort((a, b) => b.likes.length - a.likes.length)])
    //         case CHEAPEST:
    //             return setCards([...cards.sort((a, b) => a.price - b.price)])
    //         case EXPENSIVE:
    //             return setCards([...cards.sort((a, b) => b.price - a.price)])
    //         case NEWEST:
    //             return setCards([...cards.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))])
    //         case SALE:
    //             return setCards([...cards.sort((a, b) => b.discount - a.discount)])
    //         case RATE:
    //             return setCards([...cards.sort((a, b) => productRating(b) - productRating(a))])
    //         default:
    //             break;
    //     }
    // }


    // useEffect(() => {
    //     if(!userData?._id) return
    //     const fav = cards.filter(e => likedByCurrentUser(e, userData._id))
    //     setFavorites(fav)
    // }, [dispatch, userData._id])
    //
    // useEffect(() => {
    //     if (debounceValueInApp === undefined) return;
    //     api.searchProduct(debounceValueInApp)
    //         .then((data) => setCards(data))
    // }, [debounceValueInApp])


    const contextCarrier
        = {setIsAuthorized, isAuthorized, modalShow, setModalShow, setModalChildren, search, setSearch, favorites};


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
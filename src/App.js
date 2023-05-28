import React, {useCallback, useEffect, useState} from "react";
import {Navigate, Route, Routes} from "react-router";

import {api} from "./utils/api";
import {likedByCurrentUser, dateToTimestamp, productRating} from "./utils/utils";

import {Header} from "./components/Header/header";
import {Footer} from "./components/Footer/footer";
import {Modal} from "./components/Modal/modal";
import {Login} from "./components/Auth/AuthModals/login";
import {Routing} from "./components/Routing/routing";

import {useDebounce} from "./hooks/hooks";
import {AppContext} from "./context/appcontext";

import {CHEAPEST, EXPENSIVE, NEWEST, POPULAR, SALE, RATE} from "./constants/constants";
import {Register} from "./components/Auth/AuthModals/register";

export function App() {
    const [user, setUser] = useState({})
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState(undefined);
    const [favorites, setFavorites] = useState([])
    const [modalChildren, setModalChildren] = useState(<Register/>)

    const [modalShow, setModalShow] = useState(false)
    const debounceValueInApp = useDebounce(search, 350)

    const handleLike = useCallback(async (product, wasLiked) => {
        const updatedCard = await api.changeLike(product._id, wasLiked);
        setCards(s => [...s.map(e => e._id === updatedCard?._id ? updatedCard : e)]);

        wasLiked ?
            setFavorites((prevState) => prevState.filter(f => f._id !== updatedCard._id))
            :
            setFavorites((prevState) => [updatedCard, ...prevState])
        return wasLiked;
    }, [])

    const onSort = (sortKey) => {
        // TODO: сократить через spread-return
        switch (sortKey) {
            default:
                break;
            case POPULAR:
                const cardsSortedByLikes= cards.sort((a, b) => b.likes.length - a.likes.length)
                setCards([...cardsSortedByLikes])
                break;
            case CHEAPEST:
                const cardsSortedFromCheapest = cards.sort((a, b) => a.price - b.price)
                setCards([...cardsSortedFromCheapest])
                break;
            case EXPENSIVE:
                const cardsSortedFromExpensive = cards.sort((a, b) => b.price - a.price)
                setCards([...cardsSortedFromExpensive])
                break;
            case NEWEST:
                const cardsSortedByCreationTime =
                    cards.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                setCards([...cardsSortedByCreationTime])
                break;
            case SALE:
                const cardsSortedByDiscount= cards.sort((a, b) => b.discount - a.discount)
                setCards([...cardsSortedByDiscount])
                break;
            case RATE:
                const cardsSortedByRating = cards.sort((a, b) => productRating(b) - productRating(a))
                setCards([...cardsSortedByRating])
        }
    }

    useEffect(() => {
        if (debounceValueInApp === undefined) return;
        api.searchProduct(debounceValueInApp)
            .then((data) => setCards(data))
    }, [debounceValueInApp])

   useEffect(() => {
       Promise.all([api.getProductList(), api.getUserInfo()])
           .then(([productData,
                   userData]) => {
               setUser(userData);
               setCards(productData.products)
               const likedCards = productData.products.filter(e => likedByCurrentUser(e, userData._id))
               setFavorites((likedCards))
           }).catch((reject) => {console.log(reject.json)})
   }, [])

    const contextCarrier
        = {handleLike, onSort, modalShow, setModalShow, setModalChildren, search, setSearch, user, favorites, cards};


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
import React, {useCallback, useEffect, useState} from "react";
import {Route, Routes} from "react-router";

import {api} from "./utils/api";
import {likedByCurrentUser, createdAtToTimestamp, productRating} from "./utils/utils";

import {useDebounce} from "./hooks/hooks";
import {AppContext} from "./context/appcontext";
import {Header} from "./components/Header/header";
import {CHEAPEST, EXPENSIVE, NEWEST, POPULAR, SALE, RATE} from "./constants/constants";

import {CatalogPage} from "./pages/CatalogPage/catalogpage";
import {ProductPage} from "./pages/ProductPage/productpage";
import {FavoritePage} from "./pages/FavoritePage/favoritepage";


export function App() {
    const [user, setUser] = useState({})
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState(undefined);
    const [favorites, setFavorites] = useState([])
    const debounceValueInApp = useDebounce(search, 350)

    const handleLike = async (product, isLiked) => {
        const updatedCard = await api.changeLike(product._id, isLiked)
        const index = cards.findIndex(e => e._id === updatedCard._id)
        if (index !== -1) {
            setCards(state => [...state.slice(0, index), updatedCard, ...state.slice(index+1)])
        }
        isLiked ?
            setFavorites((state)=> state.filter(f => f._id !== updatedCard._id)) :
            setFavorites((state) => [updatedCard, ...state]);
    }

    const onSort = (sortKey) => {
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
                    cards.sort((a, b) => createdAtToTimestamp(b) - createdAtToTimestamp(a))
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

    const contextCarrier = {handleLike, onSort, search, setSearch, user, favorites, cards};

    return (
        <AppContext.Provider value={contextCarrier}>
        <div className='App'>
            <Header />
            <main className='container'>
                <Routes>
                    <Route path="/" element={<CatalogPage />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/favorites" element={<FavoritePage />}/>
                    <Route path="*" element={<div>404. Found nothing.</div>} />
                </Routes>
            </main>
        </div>
        </AppContext.Provider>
    )
}
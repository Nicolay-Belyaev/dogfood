import React, { useEffect, useState } from "react";
import {Route, Routes} from "react-router";
import {api} from "./utils/api";
import {useDebounce} from "./hooks/hooks";

import {Header} from "./components/Header/header";
import {CatalogPage} from "./components/Pages/CatalogPage/catalogpage";
import {ProductPage} from "./components/Pages/ProductPage/productpage";
import {FavoritePage} from "./components/Pages/FavoritePage/favoritepage";
import {createdAtToTimestamp} from "./utils/createdAtToTimestamp";

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
            case 'popular':
                const cardsSortedByLikes= cards.sort((a, b) => b.likes.length - a.likes.length)
                setCards([...cardsSortedByLikes])
                break;
            case 'cheapest':
                const cardsSortedFromCheapest = cards.sort((a, b) => a.price - b.price)
                setCards([...cardsSortedFromCheapest])
                break;
            case 'most-expansive':
                const cardsSortedFromExpensive = cards.sort((a, b) => b.price - a.price)
                setCards([...cardsSortedFromExpensive])
                break;
            case 'newest':
                const cardsSortedByCreationTime =
                    cards.sort((a, b) => createdAtToTimestamp(b) - createdAtToTimestamp(a))
                setCards([...cardsSortedByCreationTime])
                break;
            case 'sale':
                const cardsSortedByDiscount= cards.sort((a, b) => b.discount - a.discount)
                setCards([...cardsSortedByDiscount])
                break;
        }
    }

    const likedByCurrentUser = (product, userId) => {
        return product.likes.some(e => e === userId)
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
               console.log(likedCards)
           }).catch((reject) => {console.log(reject.json)})
   }, [])

    return (
        <div className='App'>
            <Header setSearch={setSearch} favorites={favorites}/>
            <main className='container'>
                <Routes>
                    <Route path="/" element={
                            <CatalogPage
                            onSort={onSort}
                            search={search}
                            cards={cards}
                            user={user}
                            handleLike={handleLike}
                        />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/favorites" element={
                        <FavoritePage
                            favorites={favorites}
                            user={user}
                            handleLike={handleLike}
                        />}
                    />
                    <Route path="*" element={<div>404. Found nothing.</div>} />
                </Routes>
            </main>
        </div>
    )
}
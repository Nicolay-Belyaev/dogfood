import React, {useEffect, useState} from "react";
import {api} from "./utils/api";

import {Header} from "./components/Header/header";
import {Cardlist} from "./components/CardList/cardlist";
import {useDebounce} from "./hooks/hooks";

function App() {
    const [user, setUser] = useState({})
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState(undefined);
    const debounceValueInApp = useDebounce(search)
    const handleProductLike = async (product, isLiked) => {
        const updatedCard = await api.changeLike(product._id, isLiked)
        const index = cards.findIndex(e => e._id === updatedCard)
        if (index !== -1) {
            setCards(state => [...state.slice(0, index), updatedCard, ...state.slice(index+1)])
        }
    }

    useEffect(() => {
        if (debounceValueInApp === undefined) return;
        api.searchProduct(debounceValueInApp)
            .then((data) => setCards(data))
    }, [debounceValueInApp])

   useEffect(() => {
       // сначала он дождется выполнения промисов и потом выполнит then. Результаты присваиваются соответственно
       Promise.all([api.getProductList(), api.getUserInfo()])
           .then(([productData,
                   userData]) => {
               setUser(userData);
               setCards(productData.products)
           })
   }, [])

    return (
        <div className='App'>
            <Header setSearch={setSearch} />
            <main className='container'>
                <Cardlist cards={cards} userId={user._id} handleLike={handleProductLike}/>
            </main>
        </div>
    )
}

export default App;

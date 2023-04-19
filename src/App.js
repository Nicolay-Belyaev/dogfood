import React, {useEffect, useState} from "react";
import {api} from "./utils/api";

import {Header} from "./components/Header/header";
import {Cardlist} from "./components/CardList/cardlist";

function App() {
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState(undefined);

    useEffect(() => {
        if (search === undefined) return;
        api.searchProduct(search)
            .then((data) => setCards(data))
    }, [search])

   useEffect(() => {
       api.getProductList()
           .then((data) => setCards(data))
   }, [])

    return (
        <div className='App'>
            <Header setSearch={setSearch} />
            <main className='container'>
                <Cardlist cards={cards} />
            </main>
        </div>
    )
}

export default App;

import React, {useEffect, useState} from "react";
import {Product} from "../../components/Product/product";
import {api} from "../../utils/api";
import {useParams} from "react-router";

export const ProductPage = () => {
    const [product, setProduct] = useState({})
    const {id} = useParams()

    useEffect(() => {
        if (id) {
            api.getProductById(id)
                .then((data) => setProduct(data))
        }
    }, [id])

    return (
        <Product product={product}/>
    )
}
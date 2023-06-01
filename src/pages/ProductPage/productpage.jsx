import React, {useCallback, useContext, useEffect, useState} from "react";
import {Product} from "../../components/Product/product";
import {api} from "../../utils/api";
import {useParams} from "react-router";
import {AppContext} from "../../context/appcontext";
import {useSelector} from "react-redux";

export const ProductPage = () => {
    const [product, setProduct] = useState({});
    const {id } = useParams();
    const {handleLike} = useContext(AppContext);
    const user = useSelector((state) => state.user.data)

    useEffect(() => {
        if (id) {
            api.getProductById(id).then((data) => setProduct(data))
        }
    }, [id])

    const onProductLike = useCallback(async (item, isLikedProduct) => {
        const wasLiked = await handleLike(item, isLikedProduct);
        if (wasLiked) {
            const filteredLikes = item.likes.filter(e => e !== user?._id);
            setProduct((s) => ({ ...s, likes: filteredLikes }))
        } else {
            const addLikes = [...item.likes, user?._id];
            setProduct((prevState) => ({ ...prevState, likes: addLikes }))
        }
    }, [handleLike, user?._id])

    const sendReview = useCallback(async data => {
        const result = await api.addProductReview(product._id, data);
        setProduct(() => ({ ...result }))
    }, [product._id])


    const onDeleteReview = useCallback(async id => {
        api.deleteProductReview(product._id, id)
            .then(data => setProduct(() => ({ ...data })))
            .catch(() => console.log('err'))
    }, [product._id])


    return (
        <>
            {!!Object.keys(product).length ?
                <Product product={product} onProductLike={onProductLike} sendReview={sendReview} onDeleteReview={onDeleteReview} />
                :
                <div>Loading...</div>}
        </>
    )
}
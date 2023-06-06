import React, {useCallback, useEffect, useState} from "react";
import {Product} from "../../components/Product/product";
import {api} from "../../utils/api";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {changeProductLike} from "../../storage/slices/cardsSlice";

export const ProductPage = () => {
    const [product, setProduct] = useState({});
    const {id} = useParams();
    const user = useSelector((state) => state.user.data)
    const dispatch = useDispatch()

    useEffect(() => {
        if (id) {
            api.getProductById(id).then((data) => setProduct(data))
        }
    }, [id])

    const onProductLike = useCallback(async (item, wasLiked) => {
        dispatch(changeProductLike({ product: item, wasLiked: wasLiked }))
        if (wasLiked) {
            const filteredLikes = item.likes.filter(e => e !== user?._id);
            setProduct((s) => ({ ...s, likes: filteredLikes }))
        } else {
            const addLikes = [...item.likes, user?._id];
            setProduct((prevState) => ({ ...prevState, likes: addLikes }))
        }
    }, [dispatch, user?._id])

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
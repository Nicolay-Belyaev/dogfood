import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {CHEAPEST, EXPENSIVE, NEWEST, POPULAR, RATE, SALE} from "../../constants/constants";
import {likedByCurrentUser, productRating} from "../../utils/utils";

const initialState = {
    products: [],
    favorites: [],
    total: 0,
    loading: false
}

export const getProducts = createAsyncThunk(
    "products/asyncGetProducts",
    async function(id, { fulfillWithValue, getState }) {
        const state = getState()
        const data = await api.getProductList()
        return fulfillWithValue({...data, userID: state.user.data?._id})
    }
)

export const changeProductLike = createAsyncThunk(
    "products/asyncChangeProductLike",
    async function(card, arg) {
        const updatedCard = await api.changeLike(
            card.product._id,
            card.wasLiked)
        return arg.fulfillWithValue({ updatedCard, wasLiked: card.wasLiked });
    }
)

export const searchProductByRequest = createAsyncThunk(
    "products/asyncSearchProductByRequest",
    async function(request, {fulfillWithValue}) {
        const requestResult = await api.searchProduct(request)
        return fulfillWithValue(requestResult)
    }
)

const Loading = (data) => {return data.type.endsWith("pending")}
const Error = (data) => {return data.type.endsWith("rejected")}

const cardsSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {
        sortProducts: (state, {payload}) => {
            switch (payload) {
                case POPULAR:
                    state.products = state.products.sort((a, b) => b.likes.length - a.likes.length)
                    break
                case CHEAPEST:
                    state.products = state.products.sort((a, b) => a.price - b.price)
                    break
                case EXPENSIVE:
                    state.products = state.products.sort((a, b) => b.price - a.price)
                    break
                case NEWEST:
                    state.products = state.products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    break
                case SALE:
                    state.products = state.products.sort((a, b) => b.discount - a.discount)
                    break
                case RATE:
                    state.products = state.products.sort((a, b) => productRating(b) - productRating(a))
                    break
                default:
                    break;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, {payload}) => {
                state.products = payload.products
                state.favorites = state.products.filter((e) => likedByCurrentUser(e, payload.userID))
                state.total = payload.total
                state.loading = false
            })
            .addCase(changeProductLike.fulfilled, (state, {payload}) => {
                const {updatedCard, wasLiked} = payload
                state.products = state.products.map((card) => card._id === updatedCard?._id ? updatedCard : card)
                if (wasLiked) {
                    state.favorites = state.favorites.filter((favoriteCard) => favoriteCard._id !== updatedCard._id)
                } else {
                    state.favorites = [...state.favorites, updatedCard]
                }
            })
            .addCase(searchProductByRequest.fulfilled, (state, {payload}) => {
                state.products = payload
            })
            .addMatcher(Loading, (state) => {
                state.loading = true
            })
            .addMatcher(Error, (state, {payload}) => {
                state.loading = false
                state.error = payload
            })

    }
})

export default cardsSlice.reducer
export const {sortProducts} = cardsSlice.actions
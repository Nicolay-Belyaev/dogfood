import {config} from "./confing";
import {theme} from "antd";

const jsonificator = (data) => {
    return data.json()
}

class Api {
    constructor(data) {
        this.baseURL = data.baseURL;
        this.headers = data.headers;
    }

    getProductById(id) {
        return fetch(`${this.baseURL}/products/${id}`, {
            method: "GET",
            headers: this.headers
        }).then(jsonificator)
            .catch((reject) => {console.log(jsonificator(reject))})
    }

    getProductList() {
        return fetch(`${this.baseURL}/products`, {
            method: "GET",
            headers: this.headers
        }).then(jsonificator)
            .catch((reject) => {console.log(jsonificator(reject))})
    }

    searchProduct(searchRequest) {
        return fetch(`${this.baseURL}/products/search?query=${searchRequest}`, {
            method: "GET",
            headers: this.headers
        }).then(jsonificator)
            .catch((reject) => {console.log(jsonificator(reject))})
    }
    getUserInfo() {
        return fetch(`${this.baseURL}/users/me`, {
            method: "GET",
            headers: this.headers
        }).then(jsonificator)
            .catch((reject) => {console.log(jsonificator(reject))})
    }
    changeLike(productId, currentLikeState) {
        return fetch(`${this.baseURL}/products/likes/${productId}`, {
            method: `${currentLikeState ? 'DELETE' : 'PUT'}`,
            headers: this.headers
        }).then(jsonificator)
            .catch((reject) => {console.log(jsonificator(reject))})
    }
    addProductReview(productId, data) {
        return fetch(`${this.baseURL}/products/review/${productId}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
        }).then(jsonificator)
            .catch((reject => {console.log(jsonificator(reject))}))
        }
    deleteProductReview(productId, reviewId) {
        return fetch(`${this.baseUrl}/products/review/${productId}/${reviewId}`, {
            headers: this.headers,
            method: "DELETE",
        }).then(jsonificator)
    }
}

export const api = new Api(config)
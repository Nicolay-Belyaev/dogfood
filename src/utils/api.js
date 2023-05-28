import {config} from "./confing";

const jsonificator = (data) => {
    return data.json()
}

// TODO: разбить апишку по предметному принципу: продукт отдельно, ревью отдельно, юзер отдельно and so on.
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
            .catch((reject) => {console.log(jsonificator(reject))
            })
    }

    getProductList() {
        return fetch(`${this.baseURL}/products`, {
            method: "GET",
            headers: this.headers
        }).then(jsonificator)
            .catch((reject) => {console.log(jsonificator(reject))
            })
    }

    searchProduct(searchRequest) {
        return fetch(`${this.baseURL}/products/search?query=${searchRequest}`, {
            method: "GET",
            headers: this.headers
        }).then(jsonificator)
            .catch((reject) => {console.log(jsonificator(reject))
            })
    }

    getUserInfo() {
        return fetch(`${this.baseURL}/users/me`, {
            method: "GET",
            headers: this.headers
        }).then(jsonificator)
            .catch((reject) => {console.log(jsonificator(reject))
            })
    }

    changeLike(productId, currentLikeState) {
        return fetch(`${this.baseURL}/products/likes/${productId}`, {
            method: `${currentLikeState ? 'DELETE' : 'PUT'}`,
            headers: this.headers
        }).then(jsonificator)
            .catch((reject) => {console.log(jsonificator(reject))
            })
    }

    addProductReview(productId, data) {
        return fetch(`${this.baseURL}/products/review/${productId}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
        }).then(jsonificator)
            .catch((reject => {console.log(jsonificator(reject))
            }))
    }

    deleteProductReview(productId, reviewId) {
        return fetch(`${this.baseURL}/products/review/${productId}/${reviewId}`, {
            method: 'DELETE',
            headers: this.headers
        }).then(jsonificator)
    }

    sighIn(data) {
        return fetch(`${this.baseURL}/signin`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
        }).then(jsonificator)
            .catch((reject => {console.log(jsonificator(reject))
            }))
    }

    sighUp(data) {
        return fetch(`${this.baseURL}/signup`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                "email": data.email,
                "password": data.password,
                "group": "12"
            })
        }).then(jsonificator)
            .catch((reject => {console.log(jsonificator(reject))
            }))
    }

    resetToken(data) {
        return fetch(`${this.baseURL}/forgot-password`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
        }).then(jsonificator)
            .catch((reject => {console.log(jsonificator(reject))
            }))
    }

    resetPassword(data, token) {
        return fetch(`${this.baseURL}/password-reset/${token}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }).then(jsonificator)
            .catch((reject => {console.log(jsonificator(reject))
            }))
    }
}

export const api = new Api(config)
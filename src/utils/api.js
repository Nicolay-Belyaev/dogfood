import {config} from "./confing";

const jsonificator = (data) => {
    return data.json()
}

class Api {
    constructor(data) {
        this.baseURL = data.baseURL;
        this.headers = data.headers;
    }

    getProductList() {
        return fetch(`${this.baseURL}/products`, {
            method: "GET",
            headers: this.headers
        }).then(jsonificator)
    }
    searchProduct(searchRequest) {
        return fetch(`${this.baseURL}/products/search?query=${searchRequest}`, {
            method: "GET",
            headers: this.headers
        }).then(jsonificator)
    }
    getUserInfo() {
        return fetch(`${this.baseURL}/users/me`, {
            method: "GET",
            headers: this.headers
        }).then(jsonificator)
    }
    changeLike(productId, currentLikeState) {
        return fetch(`${this.baseURL}/products/likes/${productId}`, {
            method: `${currentLikeState ? 'DELETE' : 'PUT'}`,
            headers: this.headers
        }).then(jsonificator)
    }

}

export const api = new Api(config)
import {config} from "./confing";
import {jsonificator, updateHeaders} from "../utils/utils";

class ProductApi {
    constructor(data) {
        this.baseURL = data.baseURL;
        this.headers = data.headers;
    }

    getProductById(id) {
        return fetch(`${this.baseURL}/products/${id}`, {
            method: "GET",
            ...updateHeaders(),
        }).then(jsonificator)
            .catch((reject) => {console.log(jsonificator(reject))
            })
    }

    getProductList() {
        return fetch(`${this.baseURL}/products`, {
            method: "GET",
            ...updateHeaders(),
        }).then(jsonificator)
            .catch((reject) => {console.log(jsonificator(reject))
            })
    }

    searchProduct(searchRequest) {
        return fetch(`${this.baseURL}/products/search?query=${searchRequest}`, {
            method: "GET",
            ...updateHeaders(),
        }).then(jsonificator)
            .catch((reject) => {console.log(jsonificator(reject))
            })
    }

    changeLike(productId, currentLikeState) {
        return fetch(`${this.baseURL}/products/likes/${productId}`, {
            method: `${currentLikeState ? 'DELETE' : 'PUT'}`,
            ...updateHeaders(),
        }).then(jsonificator)
            .catch((reject) => {console.log(jsonificator(reject))
            })
    }

    addProductReview(productId, data) {
        return fetch(`${this.baseURL}/products/review/${productId}`, {
            method: 'POST',
            ...updateHeaders(),
            body: JSON.stringify(data)
        }).then(jsonificator)
            .catch((reject => {console.log(jsonificator(reject))
            }))
    }

    deleteProductReview(productId, reviewId) {
        return fetch(`${this.baseURL}/products/review/${productId}/${reviewId}`, {
            method: 'DELETE',
            ...updateHeaders(),
        }).then(jsonificator)
    }
}

export const api = new ProductApi(config)
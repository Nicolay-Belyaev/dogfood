const jsonificator = (data) => {
    return data.json()
}

class Api {
    constructor(data) {
        this.baseURL = data.baseURL;
        this.headers = data.header;
    }

    getProductList() {
        return fetch(`${this.baseURL}/products`, {
            method: "GET",
            headers: this.headers
        }).then(jsonificator)
    }

    searchProduct(searchRequest) {
        return fetch(`${this.baseURL}/search?query=${searchRequest}`, {
            headers: this.headers
        }).then(jsonificator)
    }
}

const config = {
    baseURL: 'https://api.react-learning.ru',
    headers: {
        "Content-Type": "application/json",
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNlZDQ2NDMyOTFkNzkwYjNmMzRkZjQiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjgxOTE5NzMxLCJleHAiOjE3MTM0NTU3MzF9.2xuBfAgAuy9RgQ9_cUS-Lvyg0DJeJkd8w61S0UjxSwQ'
    }
}

export const api = new Api(config)
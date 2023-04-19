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
        authorization: 'Bearer <token>'
    }
}

export const api = new Api(config)

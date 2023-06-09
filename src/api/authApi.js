import {config} from "./confing";
import {jsonificator} from "../utils/utils";

class AuthApi {
    constructor(data) {
        this.baseURL = data.baseURL;
        this.headers = data.headers;
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

export const authApi = new AuthApi(config)
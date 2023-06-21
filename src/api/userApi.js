import {config} from "./confing";
import {jsonificator, updateHeaders} from "../utils/utils";

class UserApi {
    constructor(data) {
        this.baseURL = data.baseURL;
        this.headers = data.headers;
    }
    getUserInfo() {
        return fetch(`${this.baseURL}/users/me`, {
            method: "GET",
            ...updateHeaders(),
        }).then(jsonificator)
            .catch((reject) => {console.log(jsonificator(reject))
            })
    }
    changeUserAvatar(data) {
        return fetch(`${this.baseURL}/v2/12/users/me/avatar`, {
            method: "PATCH",
            body: JSON.stringify(data),
            ...updateHeaders(),
        }).then()
            .catch((reject) => {console.log(jsonificator(reject))
            })
    }
    changeUserInfo(data) {
        return fetch(`${this.baseURL}/v2/12/users/me/`, {
            method: "PATCH",
            body: JSON.stringify(data),
            ...updateHeaders(),
        }).then()
            .catch((reject) => {console.log(jsonificator(reject))
            })
    }
}

export const userApi = new UserApi(config)


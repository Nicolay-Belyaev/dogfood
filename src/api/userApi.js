import {config} from "./confing";
import {jsonificator} from "../utils/utils";

class UserApi {
    constructor(data) {
        this.baseURL = data.baseURL;
        this.headers = data.headers;
    }
    getUserInfo() {
        return fetch(`${this.baseURL}/users/me`, {
            method: "GET",
            headers: this.headers
        }).then(jsonificator)
            .catch((reject) => {console.log(jsonificator(reject))
            })
    }

}

export const userApi = new UserApi(config)
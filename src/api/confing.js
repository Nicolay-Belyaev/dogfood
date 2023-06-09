import {getTokenFromLocalStore} from "../utils/utils";

export const config = {
    baseURL: 'https://api.react-learning.ru',
    headers: {
        'Content-Type': "application/json",
        authorization: getTokenFromLocalStore()
    }
}
// authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDZlMTQ5NWUwYmYyYzUxOWJhZWRjZmIiLCJncm91cCI6IjEyIiwiaWF0IjoxNjg1Mjk4NjYzLCJleHAiOjE3MTY4MzQ2NjN9.Kp-UawyJyDRpB5iqp-9c-_99PeN-riuAKTP_Qs4ybok"
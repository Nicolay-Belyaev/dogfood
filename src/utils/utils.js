export const likedByCurrentUser = (product, userId) => {
    return product.likes.some(e => e === userId)
}

export const productRating = (product) => {
    if (!!product.reviews.length) {
        const ratesSum = product.reviews.reduce((acc, e) => acc + e.rating, 0)
        return Math.floor(ratesSum / product.reviews.length)
    }
    return 0
}

export const changeWordEnd = (amount, word) => {
    const leftover = amount % 10;
    if (!amount || amount === 11 || !leftover || (leftover >= 5 && leftover < 9)) {return ` ${word}ов`}
    if (leftover > 1 && leftover < 5) {return ` ${word}а`}
    if (leftover === 1) {return ` ${word}`}
}
export const jsonificator = (data) => {
    return data.json()
}

export const getTokenFromLocalStore = () => {
    return localStorage.getItem('dogfood_token')
}
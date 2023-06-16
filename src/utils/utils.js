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
    if (amount in {2:2, 3:3, 4:4}) {return ` ${word}а`}
    if (amount in {11:11}) {return ` ${word}ов`}
    if (leftover === 1 || amount === 1) {return ` ${word}`}
    else {return ` ${word}ов`}

}
export const jsonificator = (data) => {
    return data.json()
}

export const updateHeaders = () => {
    return {
        headers: {
            'Content-Type': "application/json",
            authorization: localStorage.getItem("dogfood_token")
        }
    }
}

export const getDiscountPrice = (discount, price) => {
    return (price - Math.floor(price * discount / 100)).toFixed(0)
}
export const createdAtToTimestamp = (card) => {
    return Date.parse(card.created_at)
}

export const likedByCurrentUser = (product, userId) => {
    return product.likes.some(e => e === userId)
}

export const productRating = (product) => {
    if (!!product.reviews.length) {
        const ratesSum = product.reviews.reduce((acc, e) => acc + e.rating, 0)
        return ratesSum / product.reviews.length
    }
    return 0
}
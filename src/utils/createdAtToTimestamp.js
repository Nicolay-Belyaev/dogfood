    export const createdAtToTimestamp = (card) => {
        return Date.parse(card.created_at)
    }
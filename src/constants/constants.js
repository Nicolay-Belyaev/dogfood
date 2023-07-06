export const POPULAR = 'popular';
export const CHEAPEST = 'cheapest';
export const EXPENSIVE = 'most-expansive'
export const NEWEST = 'newest'
export const SALE = 'sale'
export const RATE = 'rating'

export const sortedItems = [
    {id: POPULAR, title: 'Популярные'},
    {id: CHEAPEST, title: 'Сначала дешевые'},
    {id: EXPENSIVE, title: 'Сначала дорогие'},
    {id: NEWEST, title: 'Новинки'},
    {id: SALE, title: 'Распродажа'},
    {id: RATE, title: 'По рейтингу'}
]

export const emailRequirements = {
    required: {
        value: true,
        message: 'Пожалуйста, укажите e-mail.'
    },
    pattern: {
        value: /^([A-Za-z\d.]+)@[A-Za-z\d.]+\.([A-Za-z]+)$/,
        message: "Похоже, вы ошиблись в e-mail."
    }
}

export const passwordRequirements = {
    required: {
        value: true,
        message: 'Пожалуйста, задайте пароль.'
    },
    pattern: {
        value: /^[A-Za-z\d]{8,}$/,
        message: 'Пароль должен содержать не менее 8 символов и состоять из цифр и букв латинского алфавита.'
    }
}



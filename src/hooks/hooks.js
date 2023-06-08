import {useEffect, useState} from "react";

export const useDebounce = (path, delay) => {
    const [debounceValue, setDebounceValue] = useState(path)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(path)
        }, delay)
        return () => clearTimeout(timeout)
    }, [path])
    return debounceValue
}
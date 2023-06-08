import React, {useCallback, useEffect, useState} from "react";
import cn from 'classnames';
import s from './index.module.scss';
import {ReactComponent as Star} from "../Resourses/img/star.svg";

const emptyCells = new Array(5).fill(<></>)

export const Rating = ({rating, setRate = () => {}, mutable = false}) => {
    const [ratingCells, setRatingCells] = useState(emptyCells)

    const changeRating = useCallback((rate) => {
        if (!mutable) {
            return
        }
        setRate(rate)
    }, [setRate, mutable])
    const changeDisplay = (rate) => {
        if (!mutable) {
            return
        }
        constructRating(rate)
    }

    const constructRating = useCallback((rate) => {
        const ratingCells = emptyCells.map((el, index) =>
            <Star
                className={cn(s.star, {
                    [s.filled]: index < rate,
                    [s.editable]: mutable
                })}
                onMouseEnter={() => changeDisplay(index + 1)}
                onMouseLeave={() => changeDisplay(rating)}
                onClick={() => changeRating(index + 1)}
            />
        )
        setRatingCells(ratingCells)
    }, [rating, mutable])

    useEffect(() => {
        constructRating(rating)
    }, [constructRating])

    return (
        <div>
            {ratingCells.map((el, index) => (
                <span key={index}>{el}</span>
            ))}
        </div>
    )
}
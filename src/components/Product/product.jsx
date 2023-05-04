import React from "react";
import s from "./index.module.css";

import {BackButton} from "../BackButton/backbutton";

export const Product = ( {product} ) => {

    return (
        <div className={s.product}>
            <div className={s.titleWrapper}>
                <BackButton />
                <span className={s.productTitle}>{product.name}</span>
                <div>
                    <span>Article</span>
                    <span>Rate</span>
                </div>
            </div>
            <div className={s.imgWrapper}>
                <img className={s.img} src={product.pictures} alt={"pic"} />
            </div>
            <div className={s.desc}>
                <span className={s.price}>{product.price}&nbsp;p</span>
            </div>
            <div className={s.desc}>
                <span className={s.price}>{product.description}</span>
            </div>
        </div>
    )
}
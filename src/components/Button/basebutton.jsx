import React from "react";

import cn from "classnames";
import s from './index.module.scss'


export const BaseButton = ({ type = 'primary', children, onClick = ()=>{}, ...props }) => {

    return (<button {...props} onClick={onClick} className={cn([s.btn], {
        [s.primary]: type === 'primary',
        [s.secondary]: type === 'secondary'
    })} >
        {children}</button>)
}
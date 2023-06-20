import React from "react";

import cn from "classnames";
import s from './index.module.scss'


export const BaseButton = ({ style = 'primary', children, onClick = ()=>{}, ...props }) => {

    return (<button {...props} onClick={onClick} className={cn([s.btn], {
        [s.primary]: style === 'primary',
        [s.secondary]: style === 'secondary'
    })} >
        {children}</button>)
}
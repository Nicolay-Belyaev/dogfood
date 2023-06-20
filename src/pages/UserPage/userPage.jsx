import React from "react";
import s from "./index.module.scss"

import {UserAvatar} from "../../components/UserAvatar/userAvatar";
import {UserDescription} from "../../components/UserDescription/userDescription";

export const UserPage = () => {

    return (
            <div className={s.wrapper}>
                <div className={s.container}>
                    <UserDescription/>
                    <UserAvatar/>
                </div>
            </div>
            )
}
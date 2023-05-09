import React, {memo, useContext} from "react";
import "./header.scss"

import {Logo} from "../Logo/logo";
import {Search} from "../Search/search";
import {useLocation} from "react-router";
import {Link} from "react-router-dom";
import {ReactComponent as Basket} from '../Resourses/img/cart.svg';
import {ReactComponent as Like} from '../Resourses/img/like.svg';
import {ReactComponent as Profile} from '../Resourses/img/profile.svg';
import {AppContext} from "../../context/appcontext";


export const Header = () => {
    const {favorites, setSearch} = useContext(AppContext)
    const setSearchQuery = (searchRequest) => {
        setSearch(searchRequest)
    }

    const location = useLocation()

    return (
        <div className="header">
            <div className='container'>
                <div className='header__wrapper'>
                    <Link to={'/'}>
                        <Logo className='logo' />
                    </Link>
                    {location.pathname === '/' && <Search setSearch={setSearchQuery} />}
                    <div className='header__icons'>
                        <Link className='header__fav' to={'/favorites'}>
                            <Like className='header__like' />
                            {!!favorites.length && <span className='header__bubble'>{favorites.length}</span>}
                        </Link>
                        <Basket className='header__icon' />
                        <Profile className='header__icon' />
                    </div>
                </div>
            </div>
        </div>
        )
}
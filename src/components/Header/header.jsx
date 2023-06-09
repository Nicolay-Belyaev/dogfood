import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router";
import {useDebounce} from "../../hooks/hooks";
import {Link} from "react-router-dom";
import "./header.scss"

import {changeModalShow} from "../../storage/slices/modalSlice";
import {changeSearchRequest} from "../../storage/slices/searchSlice";
import {searchProductByRequest} from "../../storage/slices/cardsSlice";

import {Logo} from "../Logo/logo";
import {Search} from "../Search/search";

import {ReactComponent as Basket} from '../Resourses/img/cart.svg';
import {ReactComponent as Like} from '../Resourses/img/like.svg';
import {ReactComponent as Profile} from '../Resourses/img/profile.svg';

export const Header = () => {
    const user = useSelector((state) => state.user.data)
    const authorized = useSelector(state => state.user.authorized)
    const favorites = useSelector((state) => state.cards.favorites)
    const basket = useSelector(state => state.basket)
    const search = useSelector(state => state.search.searchRequest)
    const dispatch = useDispatch()
    const debounceValueInHeader = useDebounce(search, 350)

    const setSearchQuery = (searchRequest) => {
        dispatch(changeSearchRequest(searchRequest))
    }
    const location = useLocation()

    useEffect(() => {
        if (debounceValueInHeader === undefined) return;
        dispatch(searchProductByRequest(debounceValueInHeader))
    }, [debounceValueInHeader, dispatch])

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

                        <Link className='header__fav' to={'/basket'}>
                            <Basket className='header__icon' />
                            {!!basket.basket.length && <span className='header__bubble'>{basket.allProductsAmount}</span>}
                        </Link>

                        {authorized ?
                            <Link to={'/profile'}>
                                <Profile className='header__icon' />
                            </Link> :
                            <Link to={'/'} onClick={() => dispatch(changeModalShow(true))}>
                                <Profile className='header__icon' />
                            </Link>
                        }
                    </div>
                    <div>
                        <span>{user.name}</span>
                    </div>
                </div>
            </div>
        </div>
        )
}
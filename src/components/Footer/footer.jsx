import React from "react";
import './footer.scss'

import {Logo} from "../Logo/logo";
import {ReactComponent as Copyright} from '../Resourses/img/copyright.svg'
import {ReactComponent as Vk} from "../Resourses/socials/vk.svg";
import {ReactComponent as Instagram} from "../Resourses/socials/instagram.svg";

export const Footer = () => {

    return (
        <div className='footer'>
            <div className='footer__logo'>
                <Logo />
                <Copyright/>
            </div>
            <div className='footer__links'>
                <span>Каталог</span>
                <span>Акции</span>
                <span>Новости</span>
                <span>Отзывы</span>
            </div>
            <div className='footer__links'>
                <span>Оплата и доставка</span>
                <span>Часто спрашивают</span>
                <span>Обратная связь</span>
                <span>Контакты</span>
            </div>
            <div className='footer__contacts'>
                <span>Мы на связи</span>
                <div className='footer__contacts-phone'>
                    <span>8(999) 00-00-00</span>
                    <span>dogfood.ru@gmail.com</span>
                </div>
                <div className='footer__contacts-chats'>
                    <Vk />
                    <Instagram />
                </div>
            </div>
        </div>
    )
}
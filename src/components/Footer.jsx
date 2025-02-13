import React from 'react'
import "./Footer.scss"

function Footer() {
    return (
        <div className='footer'>
            <div className="footer__container">
                <div className="footer__container__inner">

                    <ul>
                        <h3>КОМПАНИЯ NAG</h3>
                        <li><a href="#">О компании</a></li>
                        <li><a href="#">Новости</a></li>
                        <li><a href="#">Контакты</a></li>
                        <li><a href="#">Банковские реквизиты</a></li>
                        <li><a href="#">Партнеры</a></li>
                    </ul>
                    <ul>
                        <h3>ПОДДЕРЖКА</h3>
                        <li><a href="#">On-line поддержка</a></li>
                        <li><a href="#">Условия оплаты</a></li>
                        <li><a href="#">Условия доставки</a></li>
                        <li><a href="#">Гарантийное обслуживание</a></li>
                        <li><a href="#">Расширенная гарантия</a></li>
                    </ul>
                    <ul>
                        <h3>ПРОЕКТЫ</h3>
                        <li><a href="#">snr.systems</a></li>
                        <li><a href="#">NAG.conference</a></li>
                        <li><a href="#">Конфигураторы</a></li>
                    </ul>
                    <ul>
                        <h3>Ваш офис</h3>
                        <li><a href="#">Ташкент</a></li>
                        <li><a href="#">+998 999999999</a></li>
                        <li><a href="#">sectortechnology.uz</a></li>
                        <li><a href="#">Ташкент, Chilonzor</a></li>
                    </ul>
                </div>
                <ul className='footer__ul'>
                    <li>© 2022–2025 sectortechnology.uz</li>
                    <li><i class="bi bi-instagram"></i></li>
                    <li><i class="bi bi-telegram"></i></li>
                    <li><i class="bi bi-facebook"></i></li>
                    <li>
                        <h5>Политика конфиденциальности</h5>
                        <h5>Политика обработки персональных данных</h5>
                    </li>
                </ul>
            </div>
        </div >
    )
}

export default Footer
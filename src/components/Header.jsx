import React, { useEffect, useRef, useState } from "react";
import "./Header.scss";
import sector__logo from "../image/sector_technology_logo.png";
import flag__uzb from "../image/flag_uzb.png";

function Header() {
  const selectRefs = useRef([]);
  const [activeSelect, setActiveSelect] = useState(null); // Храним индекс активного списка

  const handleOpenSelect = (index) => {
    setActiveSelect((prev) => (prev === index ? null : index)); // Переключаем активный select
  };

  const selects = [
    {
      label: "Покупателям",
      options: ["Способы оплаты", "Условия доставки", "Гарантийное обслуживание"],
    },
    {
      label: "Услуги",
      options: ["Wi-Fi", "Расширенная гарантия", "Системная интеграция"],
    },
    {
      label: "О нас",
      options: ["О компании", "Контактная информация", "Банковские реквизиты"],
    },
  ];

  

  return (
    <div className="header">
      <div className="header__warning">
        <h4>
          <a href="#">Корзина неавторизованных пользователей хранится 7 дней. Пожалуйста, авторизуйтесь</a>
        </h4>
      </div>
      <header className="header__container">
        <section className="header__up">
          <img src={sector__logo} alt="logo" loading="lazy" />
          <div className="search__container">
            <input type="text" placeholder="Введите поисковый запрос" />
            <i className="bi bi-search"></i>
          </div>
          <button>
            <i className="bi bi-percent"></i>
            <h5>Акции</h5>
          </button>
          <button>
            <i className="bi bi-bookmark"></i>
            <h5>Избранное</h5>
          </button>
          <button>
            <i className="bi bi-bar-chart-fill"></i>
            <h5>Сравнить</h5>
          </button>
          <button>
            <i className="bi bi-person"></i>
            <h5>Кабинет</h5>
          </button>
          <button>
            <i className="bi bi-cart"></i>
            <h5>Корзина</h5>
          </button>
        </section>
        <section className="header__down">
          <div className="header__down__left">
            <button>
              <i className="bi bi-list"></i>Каталог товаров
            </button>
            <img src={flag__uzb} alt="uzb" />
            <h6>Ташкент</h6>
            <h6>+998944443322</h6>
          </div>
          <div className="header__down__right">
            {selects.map((select, index) => (
              <div key={index} style={{ marginBottom: "10px", position: "relative" }}>
                <p onClick={() => handleOpenSelect(index)}>
                  {select.label} {activeSelect === index ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}
                </p>
                <ul
                  ref={(el) => (selectRefs.current[index] = el)}
                  className={activeSelect === index ? "select__active" : "none"}    
                >
                  {select.options.map((option, i) => (
                    <li key={i} style={{ padding: "5px", cursor: "pointer" }} onClick={()=>setActiveSelect(null)}>
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button>Онлайн чат</button>
          </div>
        </section>
      </header>
    </div>
  );
}

export default Header;

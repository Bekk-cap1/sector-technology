import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './App.scss';
import Header from './components/Header';
import banner from './assets/image/Rectangle 1.png';
import { brend, data, mainBase } from './assets/data/data';
import Footer from './components/Footer';
import logo from './assets/image/sector_technology_logo.png';
import flag__uzb from "./assets/image/flag_uzb.png"

function App() {

  const banner__img = [
    {
      id: 1,
      image: banner,
    },
    {
      id: 2,
      image: banner,
    },
    {
      id: 3,
      image: banner,
    },
    {
      id: 4,
      image: banner,
    },
  ]

  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (swiper, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  function getCorrectWord(count) {
    if (count % 10 === 1 && count % 100 !== 11) {
      return "товар";
    } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
      return "товара";
    } else {
      return "товаров";
    }
  }

  const [count, setCount] = useState(0)
  useEffect(() => {
    if (data?.length > 0) {
      const total = data.reduce((sum, item) => sum + (item.count || 0), 0);
      setCount(total);
    }
  }, [data]);

  const [showAll, setShowAll] = useState(false);
  const [showAll2, setShowAll2] = useState(false);
  const [active, setActive] = useState("Рекомендуем");

  const [basketData, setBasketData] = useState([]);
  useEffect(() => {
    const storedBasket = localStorage.getItem("basketData");
    if (storedBasket) {
      setBasketData(JSON.parse(storedBasket));
    }
  }, []);

  const addToBasket = (item) => {
    const exists = basketData.some((basketItem) => basketItem.id === item.id);
    if (!exists) {
      const updatedBasket = [...basketData, item];
      setBasketData(updatedBasket);
      localStorage.setItem("basketData", JSON.stringify(updatedBasket));
    } else {
      alert("Товар уже в корзине!");
    }
  };


  const [notification, setNotification] = useState(false);

  const handleCopy = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setNotification(true);
      setTimeout(() => setNotification(false), 3000);
    });
  };


  const [isExpanded, setIsExpanded] = useState(false);
  const longText = "Компания «НАГ» – надежный и честный партнер, предлагающий компаниям телеком-отрасли, промышленности и бизнесу эффективные решения и оборудование для решения широкого круга задач. Мы осуществляем оптовую и розничную продажу компонентов и программно-аппаратных комплексов (ПАК) для развертывания сетевой инфраструктуры, ее  модернизации и масштабирования. Наши достижения На нашем официальном сайте мы продаём оборудование, как под собственными торговыми марками, так и разработанное ведущими международными производителями телекоммуникационного оборудования. B магазине «NAG» насчитывается более тысячи брендов и свыше 20 тысяч наименований товаров. Собственная торговая марка SNR включает широкий ассортимент оборудования и комплектующих для развертывания проводных сетей передачи данных, систем безопасности и видеонаблюдения, беспроводных сетей и ЦОД. Дочерняя компания «НАГТЕХ», созданная несколько лет назад, разрабатывает и производит телекоммуникационное оборудование, способное заместить дорогие зарубежные аналоги."

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//code.jivosite.com/widget/U2VMf0hgza";
    script.async = true;
    document.body.appendChild(script);

    window.jivo_onLoadCallback = () => {
      if (window.jivo_api) {
        window.jivo_api.setWidgetState("hidden");
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openChat = () => {
    if (window.jivo_api) {
      window.jivo_api.open();
    } else {
      console.error("Jivo API не загрузился");
    }
  };

  return (
    <div className="App">
      <Header />
      {notification && (
        <div className="notification">
          Текст успешно скопирован!
        </div>
      )}
      <div className="home__container" id='start'>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
        >
          {
            banner__img.map((item) => (
              <SwiperSlide key={item.id} style={{ backgroundImage: `url(${item.image})` }} className='swiper__slide'>
                <h4>Banner {item.id}</h4>
              </SwiperSlide>
            ))
          }
        </Swiper>

        <section className="category">
          <h2>Популярные категории</h2>
          <ul className={`category__list`}>
            {
              data
                ?.sort((a, b) => {
                  if (a.id === 11) return -1;
                  if (b.id === 11) return 1;
                  return 0;
                })
                .slice(0, showAll ? data.length : 11) // Отображаем 11 товаров или все
                .map((e, i) => (
                  <li key={e.id || i}>
                    <img src={e.image} alt="" />
                    <div className="category__info">
                      <h4>{e.name}</h4>
                      <p>
                        {e.count} {getCorrectWord(e.count)}
                      </p>
                    </div>
                  </li>
                ))
            }
            <li onClick={() => setShowAll(!showAll)} className="catalog-button">
              {!showAll ? (
                <>
                  <b><i className="bi bi-arrow-right"></i></b>
                  <h4 className="catalog__h4">Смотреть весь <br /> каталог</h4>
                  <p>{count} товаров</p>
                </>
              ) : (
                <>
                  <b><i className="bi bi-arrow-left"></i></b>
                  <h4 className="catalog__h4">Скрыть каталог</h4>
                </>
              )}
            </li>
          </ul>
        </section>
        <section className="brands">
          <h2>Популярные бренды</h2>
          <ul className={`brands__list`}>
            {
              brend?.slice(0, showAll2 ? data.length : 5).map((e, i) => (
                <li key={e.id || i}>
                  <img src={e.image} alt="" />
                </li>
              ))
            }
            <li onClick={() => setShowAll2(!showAll2)} className="catalog-button">
              {!showAll2 ? (
                <>
                  <h4 className="catalog__h4">Все бренды </h4>
                </>
              ) : (
                <>
                  <h4 className="catalog__h4">Скрыть бренды <i className="bi bi-arrow-left"></i></h4>
                </>
              )}
            </li>
          </ul>
        </section>

        <main>
          <section className="section__left">
            <div className="news">
              <h2>Новости <i className="bi bi-arrow-right"></i></h2>
              <span>
                <h3><a href="#">Новая серия сварочных аппаратов SNR-
                  FS-60x уже на складе</a></h3>
                <p><i class="bi bi-clock"></i>18 апреля 2024 г.</p>
              </span>
              <span>
                <h3><a href="#">Читайте статью: Что такое PoE и для чего
                  он нужен?</a></h3>
                <p> <i class="bi bi-clock"></i>29 марта 2024 г.</p>
              </span>
            </div>

            <div className="projects">
              <h2>Наши проекты </h2>
              <span>
                <h3><a href="#"><i class="bi bi-chevron-right"></i>snr.systems</a></h3>
                <h3><a href="#"><i class="bi bi-chevron-right"></i>Конфигураторы</a></h3>
              </span>
            </div>

            <div className="how__we__work">
              <h2>Как мы работаем</h2>
              <span>
                <h3><a href="#"><i class="bi bi-chevron-right"></i>Способы оплаты</a></h3>
                <h3><a href="#"><i class="bi bi-chevron-right"></i>Условия доставки</a></h3>
                <h3><a href="#"><i class="bi bi-chevron-right"></i>Гарантийное обслуживание</a></h3>
                <h3><a href="#"><i class="bi bi-chevron-right"></i>Возврат товара</a></h3>
                <h3><a href="#"><i class="bi bi-chevron-right"></i>Вопросы и ответы</a></h3>
                <h3><a href="#"><i class="bi bi-chevron-right"></i>Техническая поддержка</a></h3>
                <h3><a href="#"><i class="bi bi-chevron-right"></i>База знаний</a></h3>
                <h3><a href="#"><i class="bi bi-chevron-right"></i>Условия доставки</a></h3>
              </span>
            </div>
          </section>

          <section className="section__right">
            <section className="section__right">
              <div className="section__right__top">
                {
                  [...new Set(mainBase?.map(e => e.type__ru))].map((type, i) => (
                    <button key={i} className={active === type ? "active__button" : ""} onClick={() => setActive(type)}>
                      {type}
                    </button>
                  ))
                }
              </div>
              <div className="section__right__down">
                <ul>
                  {
                    mainBase
                      ?.filter(e => active === "Рекомендуем" || e.type__ru === active)
                      .slice(-12)
                      .map((e, i) => (
                        <li key={e.id || i}>
                          <img src={e.image} alt="image" />
                          <div className='footer__up'>
                            <h2>{e.title}</h2>
                            <i onClick={() => handleCopy(`${e.title}`)} class="bi bi-copy"></i>
                          </div>
                          <div className='footer__middle'>
                            <h4 >{e.name}</h4>
                            <i onClick={() => handleCopy(`${e.name}`)} class="bi bi-copy"></i>
                          </div>
                          <p>В наличии: {e.count + " " + e.count__type}</p>
                          <div className='footer__down'>
                            <h6>{e.price} сум</h6>
                            <i className="bi bi-bookmark"></i>
                            <i className="bi bi-bar-chart-fill"></i>
                            {basketData.some((basketItem) => basketItem.id === e.id) ? (
                              <i className="bi bi-check2"></i>
                            ) : (
                              <i
                                onClick={() => addToBasket(e)}
                                className="bi bi-cart"
                              ></i>
                            )}
                          </div>
                        </li>
                      ))
                  }
                </ul>
              </div>
            </section>

          </section>
        </main>
        <footer className="footer__app">
          <section className="footer__left">
            <div className={`text-container ${isExpanded ? "expanded" : ""}`}>
              <p>{longText}</p>
            </div>
            <button onClick={handleToggle}>
              {isExpanded ? "Скрыть" : "Показать полный текст"}
            </button>
          </section>
        </footer>

        <section className='right__fixed'>
          <div>
            <img src={logo} alt="logo" />
            <img src={flag__uzb} alt="flag" />
            <p>Uz</p>
            <i class="bi bi-bookmark"></i>
            <i class="bi bi-bar-chart-fill"></i>
            <i class="bi bi-share"></i>
          </div>
          <div>
            <a href="#start"><i class="bi bi-arrow-up"></i></a>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default App;

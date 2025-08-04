import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useTranslation } from 'react-i18next';

const HeroSlider = () => {
  const {t } = useTranslation();
  const slides = [
    {
      id: 1,
      title: t('todo'),
      image: '/banners/todoList.png',
    },
    {
      id: 2,
      title: t('weather'),
      image: '/banners/weatherApp.png',
    },
    {
      id: 3,
      title: t('ecommerce'),
      image: '/banners/ecommercee.png',
    },
    {
      id: 4,
      title: t('template'),
      image: '/banners/templete.png',
    },
  ];

  return (
    <div className="w-full h-[500px]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h2 className="text-white text-3xl md:text-4xl font-bold text-center max-w-[80%]">
                  {slide.title}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;

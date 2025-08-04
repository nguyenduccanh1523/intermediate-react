import React from "react";
import { useTranslation } from "react-i18next";

const HeroSlide = () => {
  const { t } = useTranslation();
  return (
    <div
      className="w-full h-[400px] bg-cover bg-center"
      style={{ backgroundImage: 'url("/banners/aboutus.jpg")' }}
    >
      <div className="bg-black/40 w-full h-full flex items-center justify-center flex-col text-center">
        <h1 className="text-white text-4xl font-bold">
          {t("about")}
        </h1>
        <p className="text-white mt-4 max-w-2xl text-center">
          {t("desabout")}
        </p>
        <button onClick={() => {location.href = "/todo"}} className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200">
          {t("start")}
        </button>
      </div>
    </div>
  );
};

export default HeroSlide;

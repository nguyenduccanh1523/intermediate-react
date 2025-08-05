import React from "react";
import { useTranslation } from "react-i18next";

function WeatherCard({ data }) {
  const { t } = useTranslation();
  if (!data || !data.main || !data.weather || !data.weather[0]) {
    return (
      <div className="mt-6 bg-white text-gray-800 rounded-xl p-6 w-80 shadow-lg">
        <p className="text-center text-gray-500">No weather data available</p>
      </div>
    );
  }

  const { name, main, weather, wind } = data;
  const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="mt-6 bg-white text-gray-800 rounded-xl p-6 w-80 shadow-lg">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <div className="flex items-center">
        <img
          src={icon}
          alt={weather[0].description}
          className="w-16 h-16"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <div>
          <p className="text-3xl font-semibold">{Math.round(main.temp)}°C</p>
          <p className="capitalize">{weather[0].description}</p>
        </div>
      </div>
      <div className="mt-4 text-sm">
        <p>{t('felllike')}: {Math.round(main.feels_like)}°C</p>
        <p>{t('humidity')}: {main.humidity}%</p>
        <p>{t('wind')}: {wind?.speed || 0} m/s</p>
        {main.pressure && <p>{t('pressure')}: {main.pressure} hPa</p>}
      </div>
    </div>
  );
}

export default WeatherCard;

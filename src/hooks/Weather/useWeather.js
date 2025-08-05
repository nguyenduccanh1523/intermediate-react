import { useState } from "react";
import {
  fetchWeatherByCiTy,
  fetchWeatherForecast,
} from "../../api/Weather/weatherApi";
import { useTranslation } from "react-i18next";

export const useWeather = () => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchCity = async (city) => {
    if (!city || !city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);
    setForecast(null);

    try {
      // Fetch both current weather and forecast
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherByCiTy(city),
        fetchWeatherForecast(city),
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
      setError(null);
    } catch (err) {
      console.error("Weather API Error:", err);
      setError(`${t("error")} ${err.message}`);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return { weather, forecast, loading, error, searchCity };
};

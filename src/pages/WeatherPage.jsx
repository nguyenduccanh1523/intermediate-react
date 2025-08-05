import React from "react";
import { useWeather } from "../hooks/Weather/useWeather";
import SearchBar from "../components/Weather/SearchBar";
import WeatherCard from "../components/Weather/WeatherCard";
import ForecastCard from "../components/Weather/ForecastCard";
import { useTranslation } from "react-i18next";

const WeatherPage = () => {
  const { t } = useTranslation();
  const { weather, forecast, loading, error, searchCity } = useWeather();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 text-white flex flex-col items-center p-4">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          🌤 {t("weatherApp")}
        </h1>

        <div className="flex justify-center mb-8">
          <SearchBar onSearch={searchCity} />
        </div>

        {loading && (
          <div className="text-center">
            <p className="mt-4 animate-pulse text-xl">{t("loading")}...</p>
          </div>
        )}

        {error && (
          <div className="text-center">
            <p className="mt-4 text-red-200 bg-red-500/20 rounded-lg p-4 backdrop-blur-sm">
              {error}
            </p>
          </div>
        )}

        {weather && !loading && (
          <div className="space-y-6">
            {/* Current Weather */}
            <div className="flex justify-center">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-center">
                  {t("currentWeather")}
                </h2>
                <WeatherCard data={weather} />
              </div>
            </div>

            {/* 5-Day Forecast */}
            {forecast && (
              <div className="flex justify-center">
                <ForecastCard forecast={forecast} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;

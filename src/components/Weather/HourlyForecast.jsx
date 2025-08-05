import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function HourlyForecast({ forecast }) {
  const { t } = useTranslation();
  const [selectedDay, setSelectedDay] = useState(0);

  // Group forecast data by day
  const groupForecastByDay = (list) => {
    const grouped = {};

    list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString();

      if (!grouped[dayKey]) {
        grouped[dayKey] = [];
      }

      grouped[dayKey].push(item);
    });

    return Object.entries(grouped).slice(0, 5);
  };

  const dailyGrouped = groupForecastByDay(forecast.list);

  const formatDayName = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return t("today");
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return t("tomorrow");
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div>
      {/* Day Selector */}
      <div className="mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {dailyGrouped.map(([dayKey], index) => (
            <button
              key={dayKey}
              onClick={() => setSelectedDay(index)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedDay === index
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {formatDayName(dayKey)}
            </button>
          ))}
        </div>
      </div>

      {/* Hourly Data */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {dailyGrouped[selectedDay] &&
          dailyGrouped[selectedDay][1].map((hourData, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                {/* Time */}
                <div className="flex items-center space-x-4 flex-1">
                  <div className="text-center min-w-[60px]">
                    <p className="font-semibold text-gray-800">
                      
                      {formatTime(hourData.dt)}
                    </p>
                  </div>

                  <img
                    src={`https://openweathermap.org/img/wn/${hourData.weather[0].icon}.png`}
                    alt={hourData.weather[0].description}
                    className="w-10 h-10"
                  />

                  <div className="flex-1">
                    <p className="capitalize text-sm font-medium text-gray-800">
                      {hourData.weather[0].description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t("felllike")}: {Math.round(hourData.main.feels_like)}°C
                    </p>
                  </div>
                </div>

                {/* Temperature */}
                <div className="text-right">
                  <span className="text-xl font-bold text-gray-800">
                    {Math.round(hourData.main.temp)}°C
                  </span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                  <div className="text-center">
                    <p className="font-medium">{t("humidity")}</p>
                    <p>{hourData.main.humidity}%</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{t("wind")}</p>
                    <p>{hourData.wind.speed} m/s</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{t("pressure")}</p>
                    <p>{hourData.main.pressure} hPa</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HourlyForecast;

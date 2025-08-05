import React from "react";
import { useTranslation } from "react-i18next";

function DailyForecast({ forecast }) {
  const { t } = useTranslation();

  // Group forecast data by day
  const groupForecastByDay = (list) => {
    const grouped = {};

    list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString();

      if (!grouped[dayKey]) {
        grouped[dayKey] = {
          date: dayKey,
          temps: [],
          weather: item.weather[0],
          humidity: [],
          wind: [],
          pressure: [],
        };
      }

      grouped[dayKey].temps.push(item.main.temp);
      grouped[dayKey].humidity.push(item.main.humidity);
      grouped[dayKey].wind.push(item.wind.speed);
      grouped[dayKey].pressure.push(item.main.pressure);
    });

    return Object.values(grouped)
      .slice(0, 5)
      .map((day) => ({
        ...day,
        maxTemp: Math.max(...day.temps),
        minTemp: Math.min(...day.temps),
        avgHumidity: Math.round(
          day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length
        ),
        avgWind: (
          day.wind.reduce((a, b) => a + b, 0) / day.wind.length
        ).toFixed(1),
        avgPressure: Math.round(
          day.pressure.reduce((a, b) => a + b, 0) / day.pressure.length
        ),
      }));
  };

  const dailyData = groupForecastByDay(forecast.list);

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

  return (
    <div className="space-y-4">
      {dailyData.map((day, index) => (
        <div
          key={index}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            {/* Day and Weather Icon */}
            <div className="flex items-center space-x-4 flex-1">
              <div className="text-center min-w-[80px]">
                <p className="font-semibold text-gray-800">
                  {formatDayName(day.date)}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(day.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              <img
                src={`https://openweathermap.org/img/wn/${day.weather.icon}.png`}
                alt={day.weather.description}
                className="w-12 h-12"
              />

              <div className="flex-1">
                <p className="capitalize font-medium text-gray-800">
                  {day.weather.description}
                </p>
              </div>
            </div>

            {/* Temperature */}
            <div className="flex items-center space-x-6 text-right">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-800">
                  {Math.round(day.maxTemp)}°
                </span>
                <span className="text-sm text-gray-500">{t("maxTemp")}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-lg text-gray-600">
                  {Math.round(day.minTemp)}°
                </span>
                <span className="text-sm text-gray-500">{t("minTemp")}</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="text-center">
                <p className="font-medium">{t("humidity")}</p>
                <p>{day.avgHumidity}%</p>
              </div>
              <div className="text-center">
                <p className="font-medium">{t("wind")}</p>
                <p>{day.avgWind} m/s</p>
              </div>
              <div className="text-center">
                <p className="font-medium">{t("pressure")}</p>
                <p>{day.avgPressure} hPa</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DailyForecast;

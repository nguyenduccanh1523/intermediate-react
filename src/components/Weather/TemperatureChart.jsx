import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function TemperatureChart({ forecast }) {
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

  // Get temperature data for selected day
  const getTemperatureData = () => {
    if (!dailyGrouped[selectedDay]) return [];

    const hourlyData = dailyGrouped[selectedDay][1];
    const temps = hourlyData.map((item) => Math.round(item.main.temp));
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const tempRange = maxTemp - minTemp;

    return hourlyData.map((item) => {
      const temp = Math.round(item.main.temp);

      // Calculate height with better scaling
      let height;
      if (tempRange === 0) {
        height = 50; // Same temperature, show middle height
      } else {
        // Scale height between 20% and 100%
        height = 20 + ((temp - minTemp) / tempRange) * 80;
      }

      return {
        ...item,
        temp,
        height: Math.max(height, 25), // Minimum 25% height for visibility
        time: formatTime(item.dt),
      };
    });
  };

  const temperatureData = getTemperatureData();

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

      {/* Temperature Chart */}
      <div className="bg-gradient-to-b from-blue-50 to-indigo-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          {t("temperatureChart")} -{" "}
          {formatDayName(dailyGrouped[selectedDay]?.[0])}
        </h3>

        <div className="relative">
          {/* Chart Container */}
          <div className="flex items-end justify-between space-x-1 h-64 mb-4 bg-white/50 rounded-lg p-4">
            {temperatureData.map((data, index) => (
              <div
                key={index}
                className="flex flex-col items-center flex-1 relative"
              >
                {/* Temperature Value */}
                <div className="mb-2 text-sm font-semibold text-gray-700 bg-white/80 rounded px-1">
                  {data.temp}°
                </div>

                {/* Bar */}
                <div
                  className="w-full bg-gradient-to-t from-blue-400 to-blue-600 rounded-t-md relative transition-all duration-300 hover:from-blue-500 hover:to-blue-700 cursor-pointer group min-h-[20px] shadow-md hover:shadow-lg"
                  style={{ height: `${Math.max(data.height, 15)}%` }}
                  title={`${data.time}: ${data.temp}°C - ${data.weather[0].description}`}
                >
                  {/* Weather Icon */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <div className="bg-white rounded-full p-1 shadow-lg">
                      <img
                        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                        alt={data.weather[0].description}
                        className="w-8 h-8"
                      />
                    </div>
                  </div>

                  {/* Hover effect highlight */}
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-t-md"></div>
                </div>

                {/* Time Label */}
                <div className="mt-2 text-xs text-gray-600 transform -rotate-45 origin-center whitespace-nowrap">
                  {data.time}
                </div>
              </div>
            ))}
          </div>

          {/* Temperature Scale */}
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>
              Min: {Math.min(...temperatureData.map((d) => d.temp))}°C
            </span>
            <span>
              Max: {Math.max(...temperatureData.map((d) => d.temp))}°C
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <h4 className="font-semibold text-gray-800 mb-3 text-center">
            {t("weatherSummary")}
          </h4>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-gray-600 mb-1">{t("averageTemperature")}:</p>
              <p className="font-bold text-lg text-blue-600">
                {temperatureData.length > 0
                  ? Math.round(
                      temperatureData.reduce(
                        (sum, data) => sum + data.temp,
                        0
                      ) / temperatureData.length
                    )
                  : 0}
                °C
              </p>
            </div>
            <div className="text-center p-3 bg-indigo-50 rounded-lg">
              <p className="text-gray-600 mb-1">{t("temperatureRange")}:</p>
              <p className="font-bold text-lg text-indigo-600">
                {temperatureData.length > 0
                  ? Math.max(...temperatureData.map((d) => d.temp)) -
                    Math.min(...temperatureData.map((d) => d.temp))
                  : 0}
                °C
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              💡 {t("hoverTip") || "Hover over the bars to see weather details"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemperatureChart;

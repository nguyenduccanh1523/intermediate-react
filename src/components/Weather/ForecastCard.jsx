import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";
import TemperatureChart from "./TemperatureChart";

function ForecastCard({ forecast }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("daily");

  if (!forecast || !forecast.list) {
    return (
      <div className="mt-6 bg-white text-gray-800 rounded-xl p-6 w-full max-w-4xl shadow-lg">
        <p className="text-center text-gray-500">No forecast data available</p>
      </div>
    );
  }

  const tabs = [
    { id: "daily", label: t("dailyForecast"), icon: "📅" },
    { id: "hourly", label: t("hourlyForecast"), icon: "🕐" },
    { id: "chart", label: t("temperatureChart"), icon: "📊" },
  ];

  return (
    <div className="mt-6 bg-white text-gray-800 rounded-xl p-6 w-full max-w-4xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        🌤️ {t("forecast5Days")} - {forecast.city.name}
      </h2>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "daily" && <DailyForecast forecast={forecast} />}
        {activeTab === "hourly" && <HourlyForecast forecast={forecast} />}
        {activeTab === "chart" && <TemperatureChart forecast={forecast} />}
      </div>
    </div>
  );
}

export default ForecastCard;

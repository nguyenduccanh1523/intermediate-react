import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function SearchBar({ onSearch }) {
  const { t } = useTranslation();
  const [city, setCity] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city.trim() && !isSearching) {
      setIsSearching(true);
      await onSearch(city.trim());
      setIsSearching(false);
      setCity(""); // Clear input after search
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="px-4 py-2 rounded-md text-black outline-none focus:ring-2 focus:ring-blue-300 w-80"
        placeholder={t("weatherPlaceholder")}
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={isSearching}
      />
      <button
        type="submit"
        disabled={!city.trim() || isSearching}
        className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-md hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSearching ? t("searchingPlace") : t("searchPlace")}
      </button>
    </form>
  );
}

export default SearchBar;

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeatherByCiTy = async (city) => {
  if (!API_KEY) {
    throw new Error("Weather API key is not configured");
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("City not found");
    } else if (response.status === 401) {
      throw new Error("Invalid API key");
    } else {
      throw new Error(`Weather API error: ${response.status}`);
    }
  }

  const data = await response.json();
  return data;
};

export const fetchWeatherByCoordinates = async (lat, lon) => {
  if (!API_KEY) {
    throw new Error("Weather API key is not configured");
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Coordinates not found");
    } else if (response.status === 401) {
      throw new Error("Invalid API key");
    } else {
      throw new Error(`Weather API error: ${response.status}`);
    }
  }

  const data = await response.json();
  return data;
};

export const fetchWeatherForecast = async (city) => {
  if (!API_KEY) {
    throw new Error("Weather API key is not configured");
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("City not found");
    } else if (response.status === 401) {
      throw new Error("Invalid API key");
    } else {
      throw new Error(`Weather API error: ${response.status}`);
    }
  }

  const data = await response.json();
  return data;
};

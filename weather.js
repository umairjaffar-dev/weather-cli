import axios from "axios";

const API_KEY = "https://api.openweathermap.org/data/2.5/weather";
const APP_ID = "1219ee2cf2692f3b11435521670e24cf";

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(API_KEY, {
      params: {
        q: city,
        appid: APP_ID,
        units: "metric",
      },
    });

    const data = response.data;

    return {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      wind: data.wind.speed,
    };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error(
        "City not found. Please check the city name and try again."
      );
    } else {
      throw new Error("Unable to fetch weather data. Please try again later.");
    }
  }
};

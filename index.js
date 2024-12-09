import inquirer from "inquirer";
import { fetchWeather } from "./weather.js";

const getCurrentWeather = async () => {
  const { city } = await inquirer.prompt([
    {
      type: "input",
      name: "city",
      message: "Enter City Name:",
    },
  ]);

  try {
    const weatherData = await fetchWeather(city);
    console.log(`\nWeather in ${weatherData.city}:`);
    console.log(`- Country: ${weatherData.country}°C`);
    console.log(`- Temperature: ${weatherData.temperature}°C`);
    console.log(`- Condition: ${weatherData.description}`);
    console.log(`- Humidity: ${weatherData.humidity}%`);
    console.log(`- Wind Speed: ${weatherData.wind} m/s\n`);
  } catch (error) {
    console.error("\nError:", error.message, "\n");
  }

  const { repeat } = await inquirer.prompt([
    {
      type: "confirm",
      name: "repeat",
      message: "Do you want to check weather of another city?",
    },
  ]);

  if (repeat) {
    getCurrentWeather();
  } else {
    console.log("Goodbye!");
    return;
  }
};

getCurrentWeather();

// Get the input and button elements
let input = document.getElementById("input");
let checkWeatherBtn = document.getElementById("checkWeather");

// Add an event listener to the button
checkWeatherBtn.addEventListener("click", checkWeather);

function checkWeather(event) {
  event.preventDefault();

  console.log("Calling checkWeather")
  
  // Get the city name from the input value
  let cityName = input.value;
  
  // Fetch weather data for the given city
  let api = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relativehumidity_2m,rain,showers,snowfall,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,sunrise,sunset,precipitation_sum,rain_sum&current_weather=true&timeformat=unixtime&timezone=Africa%2FCairo&city=${encodeURIComponent(cityName)}`;
  
  console.log("Initiating call")
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
        console.log("Logging data: ", data)
      // Get the weather information from the data object
    //   let temperature = Math.round(temperature); 
        let relativehumidity = data.hourly.relativehumidity_2m?.reduce((sum, val) => sum += val, 0) / data.hourly.relativehumidity_2m.length
      let weatherInfo = {
        ...data.current_weather,
        relativehumidity: Math.round(relativehumidity)
      };
      console.log("Logging WeatherInfo: ", weatherInfo);
     
      // Update the HTML elements with the weather information
      let cityElement = document.getElementById("city");
      let tempElement = document.getElementById("temp");
      let weatherIconElement = document.querySelector(".weather_icon");
      let weatherDescElement = document.querySelector(".weather p");
      let humidityElement = document.querySelector(".humidity");
      let windElement = document.querySelector(".wind");

      console.log("This is the city name: ", cityName, weatherInfo.temperature_2m, weatherInfo.windspeed_10m, weatherInfo.weathercode)
      
      cityElement.textContent = cityName;
      tempElement.innerHTML = `${weatherInfo.temperature} <sup> °C.</sup>`;
      weatherIconElement.src = getWeatherIconUrl(weatherInfo.weathercode);
      weatherDescElement.textContent = getWeatherDescription(weatherInfo.weathercode);
      humidityElement.textContent = `Humidity: ${weatherInfo.relativehumidity}%`;
      windElement.textContent = `Wind: ${weatherInfo.windspeed}k/hr`;
    })
    .catch((err) => {
      console.error("Error occurred while fetching weather data:", err);
      // Display an error message or handle the error accordingly
    });
}

function getWeatherIconUrl(weatherCode) {
  // Define a mapping of weather codes to corresponding icon URLs
  let iconMap = {
    1: "./img/cloudy.png",
    2: "./img/sunny.png",
    3: "./img/rainy.png",
    4: "./img/snow.jpeg",
    5: "./img/thunder.png",
  };
  
  // Return the icon URL based on the weather code
  return iconMap[weatherCode] || "";
}

function getWeatherDescription(weatherCode) {
  // Define a mapping of weather codes to corresponding descriptions
  let descMap = {
    1: "Cloudy",
    2: "Sunny",
    3: "Rainy",
    4: "Snowy",
    5: "Thunder",
  };
  
  // Return the weather description based on the weather code
  return descMap[weatherCode] || "";
}

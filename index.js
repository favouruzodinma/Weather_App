// Get the input and button elements
let input = document.getElementById("input");
let checkWeatherBtn = document.getElementById("checkWeather");

// Add an event listener to the button
checkWeatherBtn.addEventListener("click", checkWeather);

function checkWeather(event) {
  event.preventDefault();
  console.log("Calling checkWeather")
  
  // Get the city name from the input value
  let cityName = input.value.trim();

let apiKey = `6732cdc972842b4fee486e61cf1443f8`;
let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  
  console.log("Initiating call")
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
        console.log("Logging data: ", data)

        let weather ={
            temperature:data.main.temp,
            humidity:data.main.humidity,
            description: data.weather[0].description,
            windspeed : data.wind.speed, 
            icon:data.weather[0].icon.length
        }
      console.log("Logging WeatherInfo: ", data);
     
      // Update the HTML elements with the weather information
      let cityElement = document.getElementById("city");
      let tempElement = document.getElementById("temp");
      let weatherIconElement = document.querySelector(".weather_icon");
      let weatherDescElement = document.querySelector(".weather p");
      let humidityElement = document.querySelector(".humidity");
      let windElement = document.querySelector(".wind");

      console.log("This is the city name: ", cityName, weather.temperature, weather.windspeed_10m, weather.weathercode)
      
      cityElement.textContent = cityName;

      tempElement.innerHTML = `${weather.temperature} <sup> °C.</sup>`;
      
      weatherIconElement.src = getWeatherIconUrl(weather.icon);
      weatherDescElement.innerHTML = `${weather.description}`;
      humidityElement.textContent = `Humidity: ${weather.humidity}%`;
      windElement.textContent = `Wind: ${weather.windspeed}k/hr`;
    })
    .catch((err) => {
      console.error("Error occurred while fetching weather data:", err);
      // Display an error message or handle the error accordingly
    });
    
function getWeatherIconUrl(weatherCode) {
    // Define a mapping of weather codes to corresponding icon URLs
    let iconMap = {
      1: "./img/sunny.png",
      2: "./img/cloudy.png",
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
      1: "Sunny",
      2: "Cloudy",
      3: "Rainy",
      4: "Snowy",
      5: "Thunder",
    };
    
    // Return the weather description based on the weather code
    return descMap[weatherCode] || "";
  }
  
}


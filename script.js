// let state = document.getElementById("state");
// let humidty = document.getElementById("humidty");
let input = document.querySelector(".top input");
// let temprature = document.getElementById("temp")
// let getWeather = document.getElementById("checkWeather")

//  let api ="https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relativehumidity_2m,rain,showers,snowfall,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,sunrise,sunset,precipitation_sum,rain_sum&current_weather=true&timeformat=unixtime&timezone=Africa%2FCairo";

// fetch(api)
// .then((response)=> response.json())
// .then((data)=>{
//      let curr = data.current_weather;
//      let daily = data.daily;
//     // curr.map((item)=>{
//     //     let newWeather ={
//     //         city:item[name],
//     //     }
//     //     console.log(newWeather);
//     // });
//     console.log(curr);
//     console.log(daily);
//     console.log(data);
// })

// async function getWeather(lat , lon , timezone){
//     let api=("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relativehumidity_2m,rain,showers,snowfall,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,sunrise,sunset,precipitation_sum,rain_sum&current_weather=true", {
//         params:{
//             latitude:lat,
//             longtitude:lon,
//             timezone,
//         }
//     })
//     console.log(api);
// }

let main = document.getElementById("main");

function getWeather() {
    // event.preventDefault();
    let api = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relativehumidity_2m,rain,showers,snowfall,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,sunrise,sunset,precipitation_sum,rain_sum&current_weather=true&timeformat=unixtime&timezone=${input.value}`;

    fetch(api)
        .then((response) => response.json())
        .then((data) => {
            main.innerHTML = "";
            let items = data.items;
            items.map((weather) => {
                let weatherElement = document.createElement("div");
                let weatherHTML = `
                    <div class="weather">
                        <p>Temperature: ${weather.temperature_2m}</p>
                        <p>Humidity: ${weather.relativehumidity_2m}</p>
                        <p>Rain: ${weather.rain}</p>
                        <p>Showers: ${weather.showers}</p>
                        <p>Snowfall: ${weather.snowfall}</p>
                        <p>Weather Code: ${weather.weathercode}</p>
                        <p>Wind Speed: ${weather.windspeed_10m}</p>
                    </div>
                `;
                weatherElement.innerHTML = weatherHTML;
                main.appendChild(weatherElement);
            });
        })
        .catch((err) => alert('Error occurred while fetching weather data.'));
}
getWeather();
let state = document.getElementById("state");
let humidty = document.getElementById("humidty");
let input = document.querySelector(".top input");

let api ="http://api.weatherapi.com/v1/current.json?key=1d4bb7b919cd47ec984222508231307&q=london&aqi=yes";

fetch(api)
.then((response)=> response.json())
.then((data)=>{
    let newWeather = data.current;
    let newLocation = data.location;
    console.log(newWeather);
    console.log(newLocation);

})

// async function checkWeather(){
    
// }
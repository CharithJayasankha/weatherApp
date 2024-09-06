let searchBox = document.getElementById("searchBox");
let locationText = document.getElementById("locationText");
let currentWeatherImg = document.getElementById("currentWeatherImg");
let temp_c = document.getElementById("temp_c");
let descText = document.getElementById("descText");
let feelsLike_c = document.getElementById("feelsLike_c");
let wind_kph = document.getElementById("wind_kph");
let pressure_mb = document.getElementById("pressure_mb");
let uv = document.getElementById("uv");
let humidity = document.getElementById("humidity");

let url =
  "http://api.weatherapi.com/v1/current.json?key=a6fe6ee90f0944f8845143548242908&q=nittambuwa";
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    locationText.textContent = `${data.location.name},${data.location.region},\n${data.location.country}`;
    currentWeatherImg.src = data.current.condition.icon;
    currentWeatherImg.style.display = "inline";
    descText.textContent = data.current.descText;
    temp_c.textContent = `${data.current.temp_c}°C`;
    feelsLike_c.textContent = `Feels Like : ${data.current.feelslike_c}°C`;
    wind_kph.textContent = data.current.wind_kph;
    pressure_mb.textContent = data.current.pressure_mb;
    uv.textContent = data.current.uv;
    humidity.textContent = data.current.humidity;
  })
  .catch((error) => console.error(error));

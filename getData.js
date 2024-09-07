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
let localTime = document.getElementById("localTime");

let apiKey = "a6fe6ee90f0944f8845143548242908";

function fetchWeather(city) {
  let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.location && data.current) {
        locationText.textContent = `${data.location.name}, ${data.location.region}, ${data.location.country}`;

        currentWeatherImg.src = "http:" + data.current.condition.icon;
        currentWeatherImg.style.display = "inline";
        descText.textContent = data.current.condition.text;

        let dateTime = data.location.localtime;
        let date = dateTime.split(" ")[1];
        console.log(date);
        localTime.textContent = date;
        temp_c.textContent = `${data.current.temp_c}°C`;
        feelsLike_c.textContent = `Feels Like: ${data.current.feelslike_c}°C`;

        wind_kph.textContent = `${data.current.wind_kph} kph`;
        pressure_mb.textContent = `${data.current.pressure_mb} mb`;
        uv.textContent = `${data.current.uv}`;
        humidity.textContent = `${data.current.humidity}%`;
      } else {
        console.error("Invalid data received from API");
      }
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}

searchBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    let city = searchBox.value.trim();
    if (city) {
      fetchWeather(city);
    }
  }
});

fetchWeather("Colombo");

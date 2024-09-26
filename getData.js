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
let hourlyForecast = document.getElementById("hourlyForecast");

let apiKey = "a6fe6ee90f0944f8845143548242908";
let array = [];
function fetchWeather(city) {
  let url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.location && data.current) {
        locationText.textContent = `${data.location.name}, ${data.location.region}, ${data.location.country}`;

        currentWeatherImg.src = "http:" + data.current.condition.icon;
        currentWeatherImg.style.display = "inline";
        descText.textContent = data.current.condition.text;

        let dateTime = data.location.localtime;
        let time = dateTime.split(" ")[1];

        localTime.textContent = time;
        temp_c.textContent = `${data.current.temp_c}°C`;
        feelsLike_c.textContent = `Feels Like: ${data.current.feelslike_c}°C`;

        wind_kph.textContent = `${data.current.wind_kph} kph`;
        pressure_mb.textContent = `${data.current.pressure_mb} mb`;
        uv.textContent = `${data.current.uv}`;
        humidity.textContent = `${data.current.humidity}%`;

        let forecastDay = data.forecast.forecastday;

        let hours = forecastDay[0].hour;

        let hourIndex = Number(time.split(":")[0]) + 1;

        let count = 0;
        for (; hourIndex < hours.length; hourIndex++) {
          if (count == 8) break;

          let card = `<div
                class="card text-center shadow col-6 col-sm-4 col-lg-2 p-2 m-1"
                style="background-color: #31b5e6; width:150px"
              >
                <div class="card-body p-1">
                  <p>${hourIndex}:00</p>
                  <img src="${"http:" + hours[hourIndex].condition.icon}">
                  <h2>${hours[hourIndex].temp_c}°C</h2>
                </div>
              </div>`;

          hourlyForecast.innerHTML += card;
          count++;
        }
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
      hourlyForecast.innerHTML = "";
    }
  }
});

fetchWeather("Colombo");

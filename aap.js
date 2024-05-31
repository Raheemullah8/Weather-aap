const search_btn = document.getElementById("btn-id");
const getInput = document.getElementById("input-id");
const weatherImg = document.getElementById("weather-img");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const loc_not_Found = document.querySelector('.location-not');
const weatherBody = document.querySelector('.weather-body');
const cityName = document.querySelector(".cityname");
const showWeather = async (city) => {

  const api_key = `24513c6d7ec0f65b2dca6b7ff2afdf95`;
  const ulr = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  const weatherData = await fetch(`${ulr}`).then((response) => response.json())

    if(weatherData.cod === "404"){
        loc_not_Found.style.display = "flex";   
        weatherBody.style.display = "none";   
    }else{
        loc_not_Found.style.display = "none";
        weatherBody.style.display = "flex";
    }

  temp.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
  description.innerHTML = `${weatherData.weather[0].description}`;
  console.log(weatherData);
  humidity.innerHTML = `${weatherData.main.humidity}%`;
  windSpeed.innerHTML = `${weatherData.wind.speed}Km/H`;
  switch (weatherData.weather[0].main) {
    case "Clouds":
      weatherImg.src = "./assets/cloud.png";
      break;
    case "Clear":
      weatherImg.src = "./assets/clear.png";
      break;
    case "Mist":
      weatherImg.src = "./assets/mist.png";
      break;
    case "Rain":
      weatherImg.src = "./assets/rain.png";
      break;
    case "Snow":
      weatherImg.src = "./assets/snow.png";
      break;
   
  }
};
search_btn.addEventListener("click", () => {
  const city = getInput.value;
  showWeather(city);
  // Pehle cityname se pehla bacha hua element remove karen
  while (cityName.firstChild) {
    cityName.removeChild(cityName.firstChild);
  }
  cityName.append(city) // Phir naya sheher ka naam add karen
  getInput.value = ""; // Input field ko saaf karen
});

getInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    search_btn.click();
    
  }
});

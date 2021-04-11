let today = new Date();

function showDate(today) {
  let dayIndex = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let monthIndex = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = monthIndex[today.getMonth()];
  let day = dayIndex[today.getDay()];
  let date = today.getDate();

  return `${day} ${month}, ${date}`;
}

function showTime(today) {
  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = showDate(today);

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = showTime(today);

function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = temperature;
}

function search(city) {
  let apiKey = "dc4d118335a81d8f125129786ca62a47";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", handleSearch);

search(`London`);
function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "dc4d118335a81d8f125129786ca62a47";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentPositionButton = document.querySelector("#current-position-button");
currentPositionButton.addEventListener("click", getPosition);

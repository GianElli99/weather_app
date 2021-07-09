var APIkey = 'e35b38d0fdfdbe50df60d75dfb60145e';
var coord = {
  lon: -60,
  lat: -36,
};
var days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
function GetWindDirection(degress) {
  if (degress <= 11.25 || degress >= 348.75) {
    return 'N';
  }
  if (11.25 < degress && degress <= 33.75) {
    return 'NNE';
  }
  if (33.75 < degress && degress <= 56.25) {
    return 'NE';
  }
  if (56.25 < degress && degress <= 78.75) {
    return 'ENE';
  }
  if (78.75 < degress && degress <= 101.25) {
    return 'E';
  }
  if (101.25 < degress && degress <= 123.75) {
    return 'ESE';
  }
  if (123.75 < degress && degress <= 146.25) {
    return 'SE';
  }
  if (146.25 < degress && degress <= 168.75) {
    return 'SSE';
  }
  if (168.75 < degress && degress <= 191.25) {
    return 'S';
  }
  if (191.25 < degress && degress <= 213.75) {
    return 'SSW';
  }
  if (213.75 < degress && degress <= 236.25) {
    return 'SW';
  }
  if (236.25 < degress && degress <= 258.75) {
    return 'WSW';
  }
  if (258.75 < degress && degress <= 281.25) {
    return 'W';
  }
  if (281.25 < degress && degress <= 303.75) {
    return 'WNW';
  }
  if (303.75 < degress && degress <= 326.25) {
    return 'NW';
  }
  if (326.25 < degress && degress <= 348.75) {
    return 'NNW';
  }
}

var input = document.getElementById('search-input');
var todayTemperatureValueElement = document.getElementById(
  'today-temperature-value'
);
var todayWeatherIcon = document.getElementById('today-weather-icon');
var todayDayElement = document.getElementById('today-day');
var todayHourElement = document.getElementById('today-hour');
var cityName = document.getElementById('city-name');
var todayWeatherListElement = document.getElementById('today-weather-list');

input.addEventListener('input', InputChange);

function InputChange(event) {
  var BsAsId = '3433955';
  var HongKongId = '1819729';
  // fetch(
  //   `https://api.openweathermap.org/data/2.5/weather?id=${BsAsId}&appid=${APIkey}&units=metric`
  // )
  //   .then((res) => res.json())
  //   .then(UpdateSummary);
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,hourly,alerts&appid=${APIkey}&units=metric`
  )
    .then((res) => res.json())
    .then(UpdateView);
}
function UpdateView(data) {
  console.log(data);
  UpdateSummary(data);
  UpdateForecast(data);
  UpdateTodayDetails(data);
}
function UpdateSummary(data) {
  todayTemperatureValueElement.textContent = Math.round(data.current.temp);

  todayWeatherIcon.innerHTML = '';
  var iconImg = document.createElement('img');
  iconImg.src =
    './weather-icons/fill/openweathermap/' +
    data.current.weather[0].icon +
    '.svg';
  todayWeatherIcon.appendChild(iconImg);

  var date = new Date(data.current.dt * 1000);
  todayDayElement.textContent = days[date.getDay()];
  var minutes =
    date.getMinutes() > 9
      ? date.getMinutes().toString()
      : '0' + date.getMinutes().toString();
  todayHourElement.textContent = date.getHours().toString() + ':' + minutes;

  cityName.textContent = 'Falta resolver';

  var listItem = document.createElement('li');
  var itemImgContainer = document.createElement('div');
  var itemImg = document.createElement('img');
  itemImg.src =
    './weather-icons/fill/openweathermap/' +
    data.current.weather[0].icon +
    '.svg';
  var itemDesc = document.createElement('p');
  itemDesc.textContent = data.current.weather[0].description.replace(
    /(^\w{1})|(\s+\w{1})/g,
    (letter) => letter.toUpperCase()
  );

  todayWeatherListElement.innerHTML = '';
  itemImgContainer.appendChild(itemImg);
  listItem.appendChild(itemImgContainer);
  listItem.appendChild(itemDesc);
  todayWeatherListElement.appendChild(listItem);
}
function UpdateTodayDetails(data) {
  var uvImgElement = document.getElementById('uv-image');
  var uvIndex =
    Math.round(data.current.uvi) !== 0
      ? Math.round(data.current.uvi).toString()
      : '1';
  uvImgElement.src = './weather-icons/fill/all/uv-index-' + uvIndex + '.svg';

  var windValuElement = document.getElementById('wind-value-number');
  windValuElement.textContent =
    Math.round((data.current.wind_speed / 1000) * 3600 * 10) / 10;
  var windDirElement = document.getElementById('wind-direction');
  windDirElement.textContent = GetWindDirection(data.current.wind_deg);

  var suriseValueElement = document.getElementById('sunrise-value');
  var sunsetValueElement = document.getElementById('sunset-value');
  var sunriseTime = new Date(data.current.sunrise * 1000);
  var sunsetTime = new Date(data.current.sunset * 1000);

  var minutes =
    sunriseTime.getMinutes() > 9
      ? sunriseTime.getMinutes().toString()
      : '0' + sunriseTime.getMinutes().toString();
  suriseValueElement.textContent =
    sunriseTime.getHours().toString() + ':' + minutes;

  minutes =
    sunsetTime.getMinutes() > 9
      ? sunsetTime.getMinutes().toString()
      : '0' + sunsetTime.getMinutes().toString();
  sunsetValueElement.textContent =
    sunsetTime.getHours().toString() + ':' + minutes;

  var humidityValueElement = document.getElementById('humidity-value');
  humidityValueElement.textContent = data.current.humidity;

  var visibilityValueElement = document.getElementById(
    'visibility-value-number'
  );
  visibilityValueElement.textContent =
    Math.round((data.current.visibility / 1000) * 10) / 10;
}
function UpdateForecast(data) {
  for (let i = 1; i <= 7; i++) {
    var forecastDate = new Date(data.daily[i].dt * 1000);
    var daySelector = '#day-' + i.toString() + ' .day-name';
    var liDay = document.querySelector(daySelector);
    liDay.textContent = days[forecastDate.getDay()].substr(0, 3);

    var iconSelector = '#day-' + i.toString() + ' .day-weather-icon';
    var liIcon = document.querySelector(iconSelector);
    liIcon.src =
      './weather-icons/fill/openweathermap/' +
      data.daily[i].weather[0].icon +
      '.svg';

    var maxTempSelector = '#day-' + i.toString() + ' .day-max-temp';
    var minTempSelector = '#day-' + i.toString() + ' .day-min-temp';

    liMax = document.querySelector(maxTempSelector);
    liMin = document.querySelector(minTempSelector);
    liMax.textContent = Math.round(data.daily[i].temp.max).toString() + '°';
    liMin.textContent = Math.round(data.daily[i].temp.min).toString() + '°';
  }
}

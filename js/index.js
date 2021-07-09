var APIkey = 'e35b38d0fdfdbe50df60d75dfb60145e';
var coord = {
  lon: -71.300003,
  lat: -41.150002,
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
function UpdateTodayDetails(data) {}
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

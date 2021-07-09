var APIkey = 'e35b38d0fdfdbe50df60d75dfb60145e';
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
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?id=${HongKongId}&appid=${APIkey}&units=metric`
  )
    .then((res) => res.json())
    .then(UpdateView);
}
function UpdateView(data) {
  console.log(data);

  todayTemperatureValueElement.textContent = Math.trunc(data.main.temp);

  todayWeatherIcon.innerHTML = '';
  var iconImg = document.createElement('img');
  iconImg.src =
    './weather-icons/fill/openweathermap/' + data.weather[0].icon + '.svg';
  todayWeatherIcon.appendChild(iconImg);

  var date = new Date(data.dt * 1000);
  todayDayElement.textContent = days[date.getDay()];
  var minutes =
    date.getMinutes() > 9
      ? date.getMinutes().toString()
      : '0' + date.getMinutes().toString();
  todayHourElement.textContent = date.getHours().toString() + ':' + minutes;

  cityName.textContent = data.name;

  var listItem = document.createElement('li');
  var itemImgContainer = document.createElement('div');
  var itemImg = document.createElement('img');
  itemImg.src =
    './weather-icons/fill/openweathermap/' + data.weather[0].icon + '.svg';
  var itemDesc = document.createElement('p');
  itemDesc.textContent = data.weather[0].description.replace(
    /(^\w{1})|(\s+\w{1})/g,
    (letter) => letter.toUpperCase()
  );

  todayWeatherListElement.innerHTML = '';
  itemImgContainer.appendChild(itemImg);
  listItem.appendChild(itemImgContainer);
  listItem.appendChild(itemDesc);
  todayWeatherListElement.appendChild(listItem);
}

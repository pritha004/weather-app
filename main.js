const searchWeather = document.querySelector(".search-weather");
const currentWeather = document.querySelector(".currentWeather");
const currentWeatherDetails = document.querySelector(".currentWeatherDetails");
const hourlyForecast=document.querySelector(".hourlyForecast");
const navbarLeft=document.querySelector("#left");



async function showWeather(e) {
  e.preventDefault();
  const location = this.querySelector("[name=location]").value;

  try {
    const weather = await getWeather(location);
    const { name, region, country, localtime } = weather.location;
    const {temp_c,feelslike_c,wind_kph,pressure_mb,uv,humidity,condition } = weather.current;
      // console.log(weather);
      const time12Hours=Number((localtime.split(' '))[1].slice(0,2))>=13 && Number((localtime.split(' '))[1].slice(0,2))<=23? (Number((localtime.split(' '))[1].slice(0,2))-12).toString()+(localtime.split(' '))[1].slice(2)+" PM":(localtime.split(' '))[1]+" AM";

    currentWeather.innerHTML = `
    <div class="card">
      <div class="left">
      <div class="top">
        <h4 id="title">${name}</h4>
        <p id="time">${time12Hours}</p>
       </div>
       <div class="bottom">
        <h1 id="tempC">${temp_c}&#8451</h1>
        <p>Feels like ${feelslike_c}&#8451</p>
       </div>
      </div>
      <div class="right">
       <img src="${condition.icon}" alt="weather_condition" />
       <p>${condition.text}</p>
      </div>
    </div>
    `;

    currentWeatherDetails.innerHTML=`
         <div class="cards">
            <div class="card" id="wind">
              <div class="top">
                <i
                  class="fa-solid fa-wind fa-lg"
                  style="padding: 0.8rem 0.5rem 0.8rem 0.8rem; background-color: rgb(24, 22, 22);"
                ></i>
                <p>Wind</p>
              </div>
              <h5 class="value">${wind_kph} km/h</h5>
            </div>
            <div class="card" id="humidity">
              <div class="top">
                <i
                  class="fa-solid fa-droplet fa-lg"
                  style="padding: 0.8rem 0.5rem 0.8rem 0.8rem; background-color: rgb(24, 22, 22);"
                ></i>
                <p>Humidity</p>
              </div>
              <h5 class="value">${humidity}%</h5>
            </div>
            <div class="card" id="pressure">
              <div class="top">
                <i
                  class="fa-solid fa-temperature-three-quarters fa-lg"
                  style="padding: 0.8rem 0.5rem 0.8rem 0.8rem; background-color: rgb(24, 22, 22);"
                ></i>
                <p>Pressure</p>
              </div>
              <h5 class="value">${pressure_mb} mb</h5>
            </div>
            <div class="card" id="uv-index">
              <div class="top">
                <i
                  class="fa-solid fa-sun fa-lg"
                  style="padding: 0.8rem 0.5rem 0.8rem 0.8rem; background-color: rgb(24, 22, 22);"
                ></i>
                <p>UV index</p>
              </div>
              <h5 class="value">${uv}</h5>
            </div>
          </div>
    `;

    hourlyForecast.innerHTML=`
    <div id="titleDiv">TODAY'S FORECAST</div>
        <div class="media-scroller snaps-inline">
        
         ${weather.forecast.forecastday[0].hour.map((hour) => {

            return `<div class="media-element">
       
            <div class="div-date"><p>${Number((hour.time.split(' '))[1].slice(0,2))>=13 && Number((hour.time.split(' '))[1].slice(0,2))<=23? (Number((hour.time.split(' '))[1].slice(0,2))-12).toString()+(hour.time.split(' '))[1].slice(2)+" PM":(hour.time.split(' ')[1])+" AM"}<p></div>
                <div class="div-icon-condition"><p>${hour.temp_c} &#8451<p></div>
                <div class="div-temp">
                  <img src="${hour.condition.icon}" alt="weather_condition" style="background-color: rgb(24, 22, 22);" />
                  <p>${hour.condition.text}<p>
                </div>
            </div>`;
         }).join('')}
      
      </div>
    `;

    navbarLeft.innerHTML=`
    <div>${weather.location.name}, ${weather.location.country}</div>
    `;
  } catch (error) {
    console.error(error);
  }
}

searchWeather.addEventListener("submit", showWeather);

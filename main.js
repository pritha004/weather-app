const searchWeather = document.querySelector(".search-weather");
const currentWeather = document.querySelector(".currentWeather");
const currentWeatherDetails = document.querySelector(".currentWeatherDetails");


async function showWeather(e) {
  e.preventDefault();
  const location = this.querySelector("[name=location]").value;

  try {
    const weather = await getWeather(location);
    const { name, region, country, localtime } = weather.location;
    const {temp_c,feelslike_c,wind_kph,pressure_mb,uv,humidity,condition } = weather.current;
      console.log(weather);
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
  } catch (error) {
    console.error(error);
  }
}

searchWeather.addEventListener("submit", showWeather);

// const data = {
//   location: {
//     name: "Kolkata",
//     region: "West Bengal",
//     country: "India",
//     lat: 22.57,
//     lon: 88.37,
//     tz_id: "Asia/Kolkata",
//     localtime_epoch: 1691071314,
//     localtime: "2023-08-03 19:31",
//   },
//   current: {
//     last_updated_epoch: 1691070300,
//     last_updated: "2023-08-03 19:15",
//     temp_c: 30.0,
//     temp_f: 86.0,
//     is_day: 0,
//     condition: {
//       text: "Mist",
//       icon: "//cdn.weatherapi.com/weather/64x64/night/143.png",
//       code: 1030,
//     },
//     wind_mph: 9.4,
//     wind_kph: 15.1, |wind
//     wind_degree: 170,
//     wind_dir: "S",
//     pressure_mb: 999.0, |mb
//     pressure_in: 29.5,
//     precip_mm: 0.0,
//     precip_in: 0.0,
//     humidity: 84, | %
//     cloud: 50,
//     feelslike_c: 36.1,
//     feelslike_f: 96.9,
//     vis_km: 4.0,
//     vis_miles: 2.0,
//     uv: 1.0, |uv index
//     gust_mph: 13.4,
//     gust_kph: 21.6,
//   },
// };

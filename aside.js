const forecast = document.querySelector(".forecast");
const astro = document.querySelector(".astro");

async function showForecast(e) {
  e.preventDefault();
  const location = this.querySelector("[name=location]").value;

  try {
    const weather = await getWeather(location);
    forecast.innerHTML = `
    <div class="forecastCard">
      <p id="title">3-DAY FORECAST</p>
      <ul>
         ${weather.forecast.forecastday.map((day) => {
            return `<li>
                <div class="div-date"><p>${day.date.slice(6).replace('-','/')}, ${(new Date(day.date).toLocaleString('en-us', {weekday: 'long'})).slice(0,3)}<p></div>
                <div class="div-icon-condition"><p>${day.day.maxtemp_c}/${day.day.mintemp_c} &#8451<p></div>
                <div class="div-temp">
                  <img src="${day.day.condition.icon}" alt="weather_condition" style="background-color: rgb(24, 22, 22);" />
                  <p>${day.day.condition.text}<p>
                </div>
            </li>`;
         }).join('')}
      </ul>
    </div>`;
  } catch (error) {
    console.error(error);
  }
}

async function showAstro(e) {
  e.preventDefault();
  const location = this.querySelector("[name=location]").value;

  try {
    const weather = await getWeather(location);
    astro.innerHTML = `
    <div class='gap'></div>
    <div class="astroCard">
      <div id="titleDiv">SUNRISE/SUNSET</div>
      <div class='card'>
      <div class='leftAstro'>
      <i class="fa-solid fa-sun fa-2xl" style="padding: 0.8rem 0.5rem 0.8rem 0.8rem; background-color: rgb(24, 22, 22);"></i>
      <div><span>Rise</span><span>${weather.forecast.forecastday[0].astro.sunrise}</span></div>
      <div><span>Set</span><span>${weather.forecast.forecastday[0].astro.sunset}</span></div>
      </div>
      <div class='rightAstro'>
      <i class="fa-solid fa-moon fa-2xl" style="padding: 0.8rem 0.5rem 0.8rem 0.8rem; background-color: rgb(24, 22, 22);"></i>
      <div><span>Rise</span><span>N/A &nbsp; &nbsp; &nbsp; &nbsp;</span></div>
      <div><span>Set</span><span>${weather.forecast.forecastday[0].astro.moonset}</span></div>
      </div>
      </div>
    </div>
    `;
  } catch (error) {
    console.error(error);
  }
}

searchWeather.addEventListener("submit", showForecast);
searchWeather.addEventListener("submit", showAstro);
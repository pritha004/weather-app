const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };
  async function getWeather(location) {
    try {
      const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&days=3`;
      const response = await fetch(url, options);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  }
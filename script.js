let weather = {
    apiKey: "ebfd93b81bf253e8d4c67866348f727b",
    fetchWeather: function (city) {
      if (!city) {
        alert("Please enter a city or location.");
        return;
      }
  
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("City not found or API request failed.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data))
        .catch((error) => {
          alert("An error occurred: " + error.message);
        });
    },
    fetchWeatherByCoords: function (lat, lon) {
      try {
        fetch(
          "https://api.openweathermap.org/data/2.5/weather?lat=" +
            lat +
            "&lon=" +
            lon +
            "&units=metric&appid=" +
            this.apiKey
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("City not found or API request failed.");
            }
            return response.json();
          })
          .then((data) => this.displayWeather(data))
          .catch((error) => {
            alert("An error occurred: " + error.message);
          });
      } catch (error) {
        alert("An error occurred: " + error.message);
      }
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
  
      const tempElement = document.querySelector(".temp");
      const unitSelector = document.getElementById("unit-selector");
      
      const celsiusTemp = temp + "°C";
      const fahrenheitTemp = (temp * 9/5 + 32).toFixed(2) + "°F";
  
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
  
      // Check which unit is selected and display temperature accordingly
      if (unitSelector.value === "celsius") {
        tempElement.innerText = celsiusTemp;
      } else if (unitSelector.value === "fahrenheit") {
        tempElement.innerText = fahrenheitTemp;
      }
  
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      const city = document.querySelector(".search-bar").value;
      this.fetchWeather(city);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
  
  // Add an event listener for the unit selector dropdown
  const unitSelector = document.getElementById("unit-selector");
  unitSelector.addEventListener("change", function () {
    weather.search(); // Trigger a new search when the unit is changed
  });
  
  // Get the user's current location
  function getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        weather.fetchWeatherByCoords(lat, lon);
      });
    } else {
      alert("Geolocation is not available in your browser.");
    }
  }
  
  getCurrentLocation();
  
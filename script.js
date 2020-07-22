const textContainer = document.getElementById('text-container');

class WeatherApp {
  constructor(data, city, temp, feel, img) {
    (this.data = {}),
      (this.city = ''),
      (this.weather = ''),
      (this.temp = ''),
      (this.feel = ''),
      (this.img = '');
  }

  getLocation = () => {
    const success = (position) => {
      this.getWeather(position.coords.latitude, position.coords.longitude);
    };
    const error = () => {
      console.log('Unable to retrieve location -error');
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log('Unable to retrieve location -else');
    }
  };

  getWeather(lat, lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=87d75e8ff883a57e85e3f1e564ca6e86`
    )
      .then((res) => res.json())
      .then((result) => {
        const { name } = result;
        const { temp, feels_like } = result.main;
        console.log(name);
        const { main, description } = result.weather[0];
        console.log(main, description);
        const data = {
          name,
          temp,
          feels_like,
          main,
          description,
        };
        this.data = data;
        this.city = name;
        this.weather = main;
        this.temp = temp;
        this.feel = feels_like;
        this.img = description;
      })
      .then(() => this.displayWeather())
      .catch((error) => {
        console.log(error);
      });
  }

  displayWeather = () => {
    const temp = document.createTextNode(`Temperatur : ${this.temp} °C | Feels like: ${this.feel} °C `);
    const city = document.createElement('h1');
    city.innerText = `${this.city} `;
    textContainer.appendChild(city);
    textContainer.appendChild(temp);


    const weather = this.weather;
    if (weather === 'Thunderstorm') {
      this.img = `<img src="https://images.unsplash.com/photo-1561485132-59468cd0b553?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2148&q=80" alt="thunderstorm">`;
    }
    if (weather === 'Drizzle' || weather === 'Rain') {
      this.img = `<img src="https://images.unsplash.com/photo-1501999635878-71cb5379c2d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80" alt="rain"/>`;
    }
    if (weather === 'Snow' || weather === 'Squall') {
      this.img = `<img src="https://images.unsplash.com/photo-1516715094483-75da7dee9758?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80" alt="snow">`;
    }
    if (
      weather === 'Mist' ||
      weather === 'Smoke' ||
      weather === 'Haze' ||
      weather === 'Dust' ||
      weather === 'Fog' ||
      weather === 'Sand' ||
      weather === 'Ash'
    ) {
      this.img = `<img src="https://images.unsplash.com/photo-1546340270-9908deb7b9a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1471&q=80" alt="fog">`;
    }
    if (weather === 'Clear') {
      this.img = `<img src="https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="clear">`;
    }
    if (weather === 'Clouds') {
      this.img = `<img src="https://images.unsplash.com/photo-1527377844612-ae9febb890c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="cloudy">`;
    }
    if (weather === 'Tornado') {
      this.img = `<img src="https://images.unsplash.com/photo-1527482937786-6608f6e14c15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="tornado">`;
    }

    let weatherImg = document.createElement('Image');
    weatherImg.setAttribute('class', 'weather-img');
    weatherImg.innerHTML = `${this.img}`;
    const weatherImgContainer = document.getElementById('weather-img-container').appendChild(weatherImg);
  };
}

const useWeatherApp = new WeatherApp();

useWeatherApp.getLocation();

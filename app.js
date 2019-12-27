window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.degree-span');

  // Formula for C

  let celsius = (temperature - 32) * (5/9);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/31dcc1e67432a573ed24adba58fb4bdd/${lat},${long}`;
      const openCage = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=115a361e6fec4051bdaf70787392cc77`

      fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
          console.log(data)
          const { temperature, summary, icon }  = data.currently;

          // Set DOM elements from API

          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;




          // Set Icon

          setIcons(icon, document.querySelector('.icon'));

          // change temp to C

          temperatureSection.addEventListener('click', () => {
              if (temperatureSpan.textContent === "F") {
                temperatureSpan.textContent = "C";
                temperatureDegree.textContent = Math.floor(celsius);
              } else {
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent = temperature;
              }
          });
        })



    });

  }else {
    h1.textContent = "Accepte la Géolocalisation 😉"
  }


  function setIcons(icon, iconID){
    const skycons = new Skycons ({color: 'white'});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase()
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }



  const submit = document.querySelector('#submit');
  const city = document.querySelector('#input').value;
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;
  const token = "&units=metric&appid=44c044300baab5aa449f67ac3b638006";

const wheatherInfo = (url) => {
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      const input = document.querySelector('#input').value;
      console.log(data);
      const meteo = document.querySelector('#meteo');
      if (submit) {
        locationTimezone.textContent = input.toUpperCase();
         temperatureDegree.textContent = data.main.temp;
         temperatureDescription.textContent = data.weather[0].description;

          //  temperatureSection.addEventListener('click', () => {
          //     if (temperatureSpan.textContent === "F") {
          //       temperatureSpan.textContent = "C";
          //       temperatureDegree.textContent = Math.floor(celsius);
          //     } else {
          //       temperatureSpan.textContent = "F";
          //       temperatureDegree.textContent = data.main.temp;
          //     }
          // });
      }
      // meteo.innerText = '';
      // const temp = parseInt(data.main.temp, 10);
      // const sky = data.weather[0].main;
      // const icon = data.weather[0].icon;
      // const hour = data.dt;
      // const date = new Date().toDateString();
      // meteo.innerHTML = `
      // <img class="weather-widget__img" src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather London , GB" width="50" height="50">
      // <h2>${date}</h2>
      // <h2 class='desc'>Weather in: ${input}</h2>
      // <h3>${temp}C° - Sky: ${sky}</h3>`;
    });
};


submit.addEventListener('click', (event) => {
  event.preventDefault();
  const city = document.querySelector('#input').value;
  const url = `${baseUrl}${city}${token}`;
  wheatherInfo(url);
});

});







// console.log("File is loaded");

// fetch("https://puzzle.mead.io/puzzle").then((response) =>
//   response.json().then((data) => console.log(data))
// );

// fetch("http://localhost:3000/weather?address=boston")
//   .then((response) =>
//     response.json().then((data) => {
//       console.log(data.weather_descriptions[0], data.placeName);
//     })
//   )
//   .catch((err) => console.log(err));

const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const forecastElement = document.querySelector(".forecast");
const locationElement = document.querySelector(".location");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  forecastElement.innerHTML = `Loading...`;
  locationElement.innerHTML = "";
  fetch(`http://localhost:3000/weather?address=${input.value}`)
    .then((response) =>
      response.json().then((data) => {
        if (data.error) {
          forecastElement.innerHTML = data.error;
        }

        locationElement.innerHTML = `Location: ${data.placeName}`;
        forecastElement.innerHTML = `Weather Forecast: ${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out, feels like ${data.feelslike} degrees out.`;
      })
    )
    .catch((err) => console.log(err));
});

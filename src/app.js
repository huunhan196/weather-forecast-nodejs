const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();

// Define path for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../templates/views");
const partialsDirPath = path.join(__dirname, "../templates/partials");

// Setup static directory to serve
app.use(express.static(publicDirPath));

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(partialsDirPath);

// app.get("", (req, res) => {
//   res.send("Hello, Express!");
// });

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Lucas Doan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Lucas Doan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Lucas Doan",
  });
});

// app.get("/help", (req, res) => {
//   res.send("Help Page");
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About Page</h1>");
// });

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(address, (error, { lat, lng, placeName } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(
      lat,
      lng,
      (error, { temperature, feelslike, weather_descriptions } = {}) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          address,
          placeName,
          weather_descriptions,
          temperature,
          feelslike,
        });
      }
    );
  });
});

// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: "You must provide a search term",
//     });
//   }
//   res.send({
//     products: [],
//   });
// });

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404 Page",
    message: "Help article not found",
    name: "Lucas Doan",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404 Page",
    message: "Page not found",
    name: "Lucas Doan",
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

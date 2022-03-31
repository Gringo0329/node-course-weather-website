const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("views", viewsDirectoryPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//Setup Static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Victor Santos",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "This a Robot",
    name: "Victor Santos",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "This is the help page.",
    helpText: "This is some helpful text.",
    name: "Victor Santos",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "Address not specified...",
    });
  }
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      } else {
        return res.send({
          location,
          forecastData,
          address,
        });
      }
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Must provide search",
    });
  }

  res.send({
    procuct: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Article not found",
    response: "Help article not found...",
    name: "Victor Santos",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    response: "Error 404: Page not found...",
    name: "Victor Santos",
  });
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});

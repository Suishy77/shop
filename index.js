require("dotenv/config");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.KEY, {
  useNewUrlParser: true
});

// On recupere le router du fichier ./routes/index.js
const routes = require("./routes/");

// On l'utilise
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started");
});

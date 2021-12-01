require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const { APP_PORT } = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const data = {
    success: true,
    messsage: "Backend is running well!",
  };

  return res.json(data);
});

const itemRoute = require("./src/routes/items");
const productRoute = require("./src/routes/products");

app.use("/items", itemRoute);
app.use("/products", productRoute);

app.listen(APP_PORT, () => {
  console.log(`App running on port ${APP_PORT}`);
});

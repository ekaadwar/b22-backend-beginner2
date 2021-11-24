const express = require("express");
const bodyParser = require("body-parser");

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

app.use("/items", itemRoute);

app.listen(8080, () => {
  console.log("App running on port 8080");
});

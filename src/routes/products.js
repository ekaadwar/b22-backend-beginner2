const route = require("express").Router();

const productController = require("../controllers/products");

route.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "gasskeun!!!",
  });
});

route.post("/", productController.createProduct);

module.exports = route;

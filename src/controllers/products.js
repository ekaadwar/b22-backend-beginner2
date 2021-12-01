const productModel = require("../models/products");

const { response: standardResponse } = require("../helpers/standardResponds");
const { validateInteger } = require("../helpers/validation");

exports.createProduct = (req, res) => {
  validateInteger(res, req.body.price, "Price", () => {
    validateInteger(res, req.body.quantity, "Quantity", () => {
      productModel.createProduct(req.body, (error, results, _fields) => {
        if (!error) {
          return standardResponse(
            res,
            "Product has been created successfully",
            results
          );
        } else {
          return standardResponse(res, `Error: ${error}`, null, 400);
        }
      });
    });
  });
};

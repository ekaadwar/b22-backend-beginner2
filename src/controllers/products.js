const productModel = require("../models/products");
const productCategoryModel = require("../models/productCategories");

const { response: standardResponse } = require("../helpers/standardResponds");
const { validateInteger } = require("../helpers/validation");

exports.createProduct = (req, res) => {
  validateInteger(res, req.body.price, "Price", () => {
    validateInteger(res, req.body.quantity, "Quantity", () => {
      productModel.createProduct(req.body, (error, results, _fields) => {
        if (!error) {
          if (typeof req.body.category !== "object") {
            req.body.category = [req.body.category];
          }

          req.body.category.forEach((id_category) => {
            const data = {
              id_product: results.insertId,
              id_category: parseInt(id_category),
            };

            productCategoryModel.createProductCategories(data, () => {
              console.log(
                `Product ${data.id_product} has been added to category ${data.id_category}`
              );
            });
          });

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

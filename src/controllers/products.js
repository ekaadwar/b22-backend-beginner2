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

exports.getProductDetails = (req, res) => {
  const { id } = req.params;

  productModel.getProductDetails(id, (error, results, _fields) => {
    if (!error) {
      const data = {
        id: 1,
        picture: "",
        name: "",
        description: "",
        quantity: "",
        delivery_on: "",
        variants: [],
        created_at: "",
        updated_at: "",
        ...results[0],
      };

      const hiddenColumn = [
        "base_price",
        "additional_price",
        "end_price",
        "delivery_on",
        "variants_name",
        "variants_code",
      ];

      hiddenColumn.forEach((column) => {
        delete data[column];
      });

      results.forEach((product) => {
        data.variants.push({
          name: product.variants_name,
          code: product.variants_code,
          price: product.end_price,
        });
      });

      return standardResponse(res, `Product Details`, data);
    } else {
      return standardResponse(res, `Error : ${error.sqlMessage}`, null, 404);
    }
  });
};

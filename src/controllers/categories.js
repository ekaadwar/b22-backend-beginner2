const categoryModel = require("../models/categories");

const { response: standardResponse } = require("../helpers/standardResponds");

exports.createCategories = (req, res) => {
  categoryModel.createCategory(req.body, (error, results, _fileds) => {
    if (!error) {
      return standardResponse(
        res,
        "Category data has beed created successfully!!",
        results,
        200
      );
    } else {
      return standardResponse(res, `Error : ${error.sqlMessage}`, null, 400);
    }
  });
};

exports.getCategories = (req, res) => {
  categoryModel.getCategories((error, results, _fields) => {
    if (!error) {
      return standardResponse(res, "List of Categories", results);
    } else {
      return standardResponse(res, `Error : ${error.sqlMessage}`, null, 400);
    }
  });
};

exports.getProductByCategories = (req, res) => {
  const { id } = req.params;

  categoryModel.getProductByCategories(id, (error, results, _fields) => {
    if (!error) {
      return standardResponse(res, "Product List by Categories.", results);
    } else {
      console.log(error);
      return standardResponse(res, `Error : ${error.sqlMessage}`, null, 404);
    }
  });
};

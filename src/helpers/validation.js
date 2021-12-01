const { response: standardResponse } = require("./standardResponds");

exports.validateInteger = (res, data, fields, cb) => {
  if (data) {
    data = parseInt(data);

    if (data < 1) {
      return standardResponse(
        res,
        `${fields} cannot be less than 1`,
        null,
        400
      );
    } else {
      cb();
    }
  }
};

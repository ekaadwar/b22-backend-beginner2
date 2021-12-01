exports.response = (res, message = "", results, status = 200) => {
  const returnData = {
    success: true,
    message,
  };

  if (status >= 400) {
    returnData.success = false;
  }

  if (results !== null) {
    returnData.results = results;
  }

  return res.status(status).json(returnData);
};

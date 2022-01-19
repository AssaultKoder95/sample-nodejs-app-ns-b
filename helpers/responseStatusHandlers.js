const { errorCodes } = require("./constants");

function responseHandler(res, statusCode, body) {
  res.statusCode = statusCode;

  if (typeof body === "string") {
    return res.send(body);
  }

  if (typeof body === "object") {
    return res.json(body);
  }

  return res.end();
}

function errorHandler(res, statusCode, body) {
  res.statusCode = statusCode ? statusCode : errorCodes.INTERNAL_SERVER_ERROR;

  if (typeof body === "string") {
    return res.send(body);
  }

  if (typeof body === "object") {
    return res.json(body);
  }

  return res.send("Something went wrong!");
}

module.exports = { responseHandler, errorHandler };

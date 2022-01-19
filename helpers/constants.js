const errorCodes = {
  BAD_REQUEST: 400,
  UNATHUORISED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const successCodes = {
  SUCCESS: 200,
  CREATED: 201,
  CREATED_NO_CONTENT: 204,
};

module.exports = { successCodes, errorCodes };

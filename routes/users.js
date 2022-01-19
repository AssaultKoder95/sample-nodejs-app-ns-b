const express = require("express");
const router = express.Router();

const { users: userController } = require("../controllers");
const { addUserSchema } = require("../schemas");

const {
  responseHandler,
  errorHandler,
  successCodes,
  errorCodes,
} = require("../helpers");

router.get("/", (req, res) => {
  try {
    const users = userController.getAllUserDetails();
    responseHandler(res, successCodes.SUCCESS, users);
  } catch (error) {
    const message = (error && error.message) || error;
    console.log(message);
    errorHandler(res, errorCodes.INTERNAL_SERVER_ERROR, message);
  }
});

router.get("/:userId", (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const user = userController.getSingleUserDetails(userId);
    responseHandler(res, successCodes.SUCCESS, user);
  } catch (error) {
    const message = (error && error.message) || error;
    console.log(message);

    if (message === "no-matching-item-found") {
      return errorHandler(res, errorCodes.NOT_FOUND, {});
    }

    return errorHandler(res, errorCodes.INTERNAL_SERVER_ERROR, message);
  }
});

router.post("/", (req, res) => {
  try {
    const inputArgs = req.body;

    // make sure input args are validated before inserting into DB
    const { value, error } = addUserSchema.validate(inputArgs);

    if (error) {
      return errorHandler(res, errorCodes.BAD_REQUEST, error);
    }

    const addedUser = userController.addUser(value);

    responseHandler(res, successCodes.CREATED, addedUser);
  } catch (error) {
    const message = (error && error.message) || error;
    console.log(message);
    return errorHandler(res, errorCodes.INTERNAL_SERVER_ERROR, message);
  }
});

router.put("/:userId", (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const { name } = req.body;

    const updatedUser = userController.updateUser(userId, name);

    responseHandler(res, successCodes.SUCCESS, updatedUser);
  } catch (error) {
    const message = (error && error.message) || error;
    console.log(message);

    if (message === "no-matching-item-found") {
      return errorHandler(res, errorCodes.NOT_FOUND, {});
    }

    return errorHandler(res, errorCodes.INTERNAL_SERVER_ERROR, message);
  }
});

router.delete("/:userId", (req, res) => {
  try {
    console.log(req.params);
    const userId = parseInt(req.params.userId, 10);
    userController.deleteUser(userId);

    responseHandler(res, successCodes.CREATED_NO_CONTENT);
  } catch (error) {
    const message = (error && error.message) || error;
    console.log(message);

    if (message === "no-matching-item-found") {
      return errorHandler(res, errorCodes.NOT_FOUND, {});
    }

    return errorHandler(res, errorCodes.INTERNAL_SERVER_ERROR, message);
  }
});

module.exports = router;

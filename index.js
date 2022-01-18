const express = require("express");

// define an instance of express app
const app = express();

const Joi = require("joi");

// environment variable
const PORT = process.env.PORT;

// Custom Middleware

function customMiddleware(req, res, next) {
  // validate input values
  // check if the user is authorized to access this endpoint
  // checking if the element is present / not
  console.log("Checking request body inside middleware", req.body);

  const { error } = userSchema.validate(req.body);

  if (error) {
    // Bad Request
    res.statusCode = 400;
    res.json({ message: error.message });
    res.end();
  }

  // console.log(req.headers);

  // if (req.headers.userid == 5) {
  //   res.statusCode = 403;
  //   return res.json({
  //     message: "User does not have permission to do this action",
  //   });
  // }

  // if (req.body.id == 5) {
  //   res.statusCode = 400;
  //   return res.json({
  //     message: "Item already exists",
  //   });
  // }

  next();
}

// Middleware
// all requests goes through them
app.use(express.json());

// Dummy Data
const usersArray = [
  {
    id: 1,
    name: "AK 1",
  },
  {
    id: 2,
    name: "AK 2",
  },
  {
    id: 3,
    name: "AK 3",
  },
];

// Sample CRUD App
app.get("/api/users", (req, res) => {
  console.log("Sending all users");
  return res.json(usersArray);
});

app.get("/api/users/:userId", (req, res) => {
  const userId = req.params.userId;

  const filteredItem = usersArray.filter(
    (user) => user.id === parseInt(userId, 10)
  );

  if (filteredItem.length) {
    return res.json(filteredItem[0]);
  } else {
    res.statusCode = 404;
    return res.json({ message: "Item not found!" });
  }
});

// Complex Input Validations
// Use JOI Library
const userSchema = Joi.object({
  id: Joi.number().min(1).max(10).required(),
  name: Joi.string().alphanum().min(5).max(8).required(),
});

app.post("/api/users", customMiddleware, (req, res) => {
  const inputArgs = req.body;

  // make sure input args are validated before inserting into DB
  // const { value, error } = userSchema.validate(inputArgs);

  // if (error) {
  //   // Bad Request
  //   res.statusCode = 400;
  //   res.json({ message: error.message });
  //   res.end();
  // }

  // console.log("validated value", value);
  // usersArray.push(value);

  usersArray.push(inputArgs);

  res.statusCode = 201;
  res.send(inputArgs);
  res.end();
});

// users/:userId => path parameter
// users ?userId=1 => query parameter

app.put("/api/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const inputArgs = req.body;

  const isInputObjectInvalid = !inputArgs.name;

  if (isInputObjectInvalid) {
    res.statusCode = 500;
    res.end();
  }

  const itemIdx = usersArray.findIndex(
    (user) => user.id === parseInt(userId, 10)
  );

  if (itemIdx > -1) {
    // Update inside an array of objects
    usersArray[itemIdx].name = inputArgs.name;

    res.statusCode = 204;
    res.end();
  } else {
    res.statusCode = 404;
    return res.json({ message: "Item not found!" });
  }
});

app.delete("/api/users/:userId", (req, res) => {
  const userId = req.params.userId;

  console.log("path param:", userId);

  const itemIdx = usersArray.findIndex(
    (user) => user.id === parseInt(userId, 10)
  );

  if (itemIdx > -1) {
    usersArray.splice(itemIdx, 1);
    res.statusCode = 204;
    res.end();
  } else {
    res.statusCode = 404;
    return res.json({ message: "Item not found!" });
  }
});

// Catch All Handler
app.all("*", (req, res) => {
  res.statusCode = 404;
  return res.json({ message: "Where are you roaming around?" });
});

app.listen(PORT, () => {
  console.log(`we are using ${process.env.ENV} environment`);
  console.log(`Listening to port number ${PORT}`);
});

const express = require("express");

// define an instance of express app
const app = express();

// environment variable
const PORT = process.env.PORT;

// Middleware
// all requests goes through them
app.use(express.json());

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

app.post("/api/users", (req, res) => {
  const inputArgs = req.body;

  // make sure input args are validated before inserting into DB

  console.log("inputArgs", inputArgs);
  usersArray.push(inputArgs);

  res.statusCode = 201;
  res.send(inputArgs);
  res.end();
});

// users/:userId => path parameter
// users ?userId=1 => query parameter

app.put("/api/users/:userId", (req, res) => {
  const userId = req.params.userId;

  console.log("path param:", userId, typeof userId);

  const filteredItem = usersArray.filter(
    (user) => user.id === parseInt(userId, 10)
  );

  if (filteredItem.length) {
    // the core logic differs
    // we actually update item in the DB
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

  const filteredItem = usersArray.filter(
    (user) => user.id === parseInt(userId, 10)
  );

  if (filteredItem.length) {
    // the core logic differs
    // we actually delete the item from the DB
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

const express = require("express");
const { loggerMiddleware } = require("./middlewares");
const routes = require("./routes");

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(loggerMiddleware);

// Sample CRUD App

app.use("/api", routes);

// Catch All Handler
app.all("*", (req, res) => {
  res.statusCode = 404;
  return res.json({ message: "Where are you roaming around?" });
});

app.listen(PORT, () => {
  console.log(`we are using ${process.env.ENV} environment`);
  console.log(`Listening to port number ${PORT}`);
});

/* 
Things to take care of 
1. Try to ensure that no file exceeds 200 lines 
2. Create helper functions
3. Create constants ( use them around code )
*/

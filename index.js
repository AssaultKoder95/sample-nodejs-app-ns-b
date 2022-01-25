const express = require("express");
const { loggerMiddleware } = require("./middlewares");
const routes = require("./routes");

const app = express();

const PORT = process.env.PORT;

const mongoose = require("mongoose");
const MONGODB_URL = "mongodb://localhost:27017/test";

async function main() {
  mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const connection = mongoose.connection;

  connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
  });

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
}

main().catch((err) => console.log(err));

/* 
Things to take care of 
1. Try to ensure that no file exceeds 200 lines 
2. Create helper functions
3. Create constants ( use them around code )
*/

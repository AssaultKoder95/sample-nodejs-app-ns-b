const { MongoClient } = require("mongodb");

// The URL to our mongodb database
const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("test");
    const inventory = database.collection("inv_test");

    const query = { qty: { $gt: 10 } };
    const item = await inventory.find({});
    console.log(item);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

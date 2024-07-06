const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
 
require("dotenv").config(); // Make sure to install dotenv package

// middle ware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://my-ass-12-1aa68.web.app",
      "https://my-protfolio-f124e.firebaseapp.com/",
    ],
  })
);
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hv89ofo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
 
    const projectsCollection = client
      .db("ProtfolioData")
      .collection("AllProjects");

    app.get("/getprotfolio", async (req, res) => {
      try {
        const result = await projectsCollection.find().toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send("Error fetching portfolio data");
        console.error("Error fetching portfolio data:", error);
      }
    });
    console.log('rana');

    app.get("/getsingleprotfolio/:id", async(req, res)=>{
            const id = req.params.id;
            const query = {_id : new ObjectId(id)}
            const result = await projectsCollection.findOne(query)
            res.send(result)
    })

    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Alhamdulillah my portfolio website is running, Alhamdulillah");
});

app.listen(port, () => {
  console.log(`Your port is running on ${port}`);
});

// Properly handle shutdown
process.on("SIGINT", async () => {
 
  console.log("MongoClient closed");
  process.exit(0);
});

process.on("SIGTERM", async () => {
 
  console.log("MongoClient closed");
  process.exit(0);
});

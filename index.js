const express = require("express");
const cors = require("cors");
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y24v7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const projectCollection = client.db('abubakkar-js-dev').collection('projects');



    app.get('/projects',async(req,res)=>{
        const cursor = projectCollection.find();
        const result = await cursor.toArray();

        res.send(result);
    })
    app.get('/projects/:id',async(req,res)=>{
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)};
        const result = await projectCollection.find(filter).toArray();

        res.send(result);

     })



  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Porfollio Server is working...");
});

app.listen(port, () => {
  console.log(`The server is running on port: ${port}`);
});

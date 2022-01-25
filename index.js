const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://BookZone:ZVCZUDZEXFVYpAew@cluster0.u8ama.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("BookZone");
      const storeCollection = database.collection("Stores");
      const bookCollection = database.collection("Books");
    
    // Get All Store List
    app.get('/stores', async (req, res) => {
        const result = await storeCollection.find({}).toArray();
        res.send(result);
    });

    // Get All Books List
    app.get('/books', async (req, res) => {
        const result = await bookCollection.find({}).toArray();
        res.send(result);
    });

    // Get Books List By Store Name
    app.get('/books/:storeName', async (req, res) => {
        const query = req.params;
        const result = await bookCollection.find(query).toArray();
        res.send(result);
    });
     
      
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('BikeZone Back End is Running');
})

app.listen(port, () => {
    console.log("Listening to", port);
})
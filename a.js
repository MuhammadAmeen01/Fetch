const fetch = require('node-fetch');

const fetchProducts = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

fetchProducts().then((data) => console.log(data));
const { MongoClient } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectToMongo = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('mydatabase');
    return db;
  } catch (err) {
    console.error(err);
  }
};

const insertProducts = async (db, products) => {
  const collection = db.collection('products');
  try {
    const result = await collection.insertMany(products);
    console.log(`${result.insertedCount} products inserted`);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

fetchProducts()
  .then((products) => connectToMongo().then((db) => insertProducts(db, products)))
  .catch((err) => console.error(err));


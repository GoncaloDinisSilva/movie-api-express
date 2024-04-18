const { MongoClient } = require("mongodb");
const url = process.env.MONGO_URL ?? "mongodb://127.0.0.1:27017"; // windows
let client;

async function connectToMongo() {
    try {
        if (!client) {
            client = await MongoClient.connect(url);
        }
        return client;
    } catch (err) {
        console.log(err);
    }
}

async function getMongoCollection(dbName, collectionName) {
    const client = await connectToMongo()
    return client.db(dbName).collection(collectionName)
}

module.exports = { getMongoCollection };

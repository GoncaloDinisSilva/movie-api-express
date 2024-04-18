const { getMongoCollection } = require("./db");

async function ReadAllMovies() {
    const collection = await getMongoCollection("Movies", "movie");
    const res = await collection.find();
    return res.toArray();
}

module.exports = { ReadAllMovies }
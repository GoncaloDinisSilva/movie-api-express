const { getMongoCollection } = require("./db");

async function ReadAllMovies() {
    const collection = await getMongoCollection("Movies", "movie");
    const res = await collection.find();
    return res.toArray();
}

async function CreateMovie(movie) {
    const collection = await getMongoCollection("Movies", "movie");
    const res = await collection.insertOne(movie);
    return res.insertedId;
}

module.exports = { ReadAllMovies, CreateMovie }
const { getMongoCollection } = require("./db");
const { ObjectId } = require("mongodb")

async function ReadAllMovies() {
    const collection = await getMongoCollection("Movies", "movie");
    const res = await collection.find();
    return res.toArray();
}

async function CreateNewMovie(movie) {
    const collection = await getMongoCollection("Movies", "movie");
    const res = await collection.insertOne(movie);
    return res.insertedId;
}

async function UpdateMovieDetails(movie, movieTitle, movieDescription, MovieReleaseDate, MovieGenre) {
    const collection = await getMongoCollection("Movies", "movie");
    const res = await collection.updateOne({ _id: new ObjectId(movie) }, { $set: { title: movieTitle, description: movieDescription, releasedate: MovieReleaseDate, genre: MovieGenre } });
    return res;
}

module.exports = { ReadAllMovies, CreateNewMovie, UpdateMovieDetails }
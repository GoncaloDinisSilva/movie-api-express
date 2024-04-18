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

async function UpdateMovieDetails(movieId, movieTitle, movieDescription, movieReleaseDate, movieGenre) {
    const collection = await getMongoCollection("Movies", "movie");
    const res = await collection.updateOne({ _id: new ObjectId(movieId) }, { $set: { title: movieTitle, description: movieDescription, releasedate: movieReleaseDate, genre: movieGenre } });
    return res;
}

async function DeleteMovie(movieId) {
    const collection = await getMongoCollection("Movies", "movie");
    const res = await collection.deleteOne({ _id: new ObjectId(movieId) });
    return res;
}

async function ListGenres() {
    const collection = await getMongoCollection("Movies", "movie");
    const res = await collection.distinct("genre");
    return res;
}

async function CreateNewGenre(genre) {
    const collection = await getMongoCollection("Movies", "genre");
    const res = await collection.insertOne({ genre });
    return res.insertedId;
}

async function DeleteGenre(genreId) {
    const movieCollection = await getMongoCollection("Movies", "movie");
    const res = await movieCollection.updateMany({ genre: genreId }, { $pull: { genre: genreId } });

    if (res.modifiedCount === 0) {
        throw new Error("Genre not found in any movies");
    }

    const genreCollection = await getMongoCollection("Genres", "genre");
    const deleteResult = await genreCollection.deleteOne({ _id: new ObjectId(genreId) });

    if (deleteResult.deletedCount === 0) {
        throw new Error("Genre not found");
    }

    return res;
}

async function SearchMoviesByTitle(title) {
    const collection = await getMongoCollection("Movies", "movie");
    const res = await collection.find({ title: { $regex: title, $options: 'i' } }).toArray();
    return res;
}

async function SearchMoviesByGenre(genre) {
    const collection = await getMongoCollection("Movies", "movie");
    const res = await collection.find({ genre: { $regex: genre, $options: 'i' } }).toArray();
    return res;
}



module.exports = { ReadAllMovies, CreateNewMovie, UpdateMovieDetails, DeleteMovie, ListGenres, CreateNewGenre, DeleteGenre, SearchMoviesByTitle, SearchMoviesByGenre }
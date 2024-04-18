const express = require("express");
const { ReadAllMovies, CreateNewMovie, UpdateMovieDetails, DeleteMovie, ListGenres, CreateNewGenre } = require("./src/CRUD");
const app = express();
const port = process.env.PORT ?? 3030;

app.use(express.json());

app.get('/api/read/allmovies', async (req, res) => {
    try {
        const movie = await ReadAllMovies();
        res.status(200).json({ movie });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/api/create/movie', async (req, res) => {
    try {
        const { title, description, releasedate, genre } = req.body;
        const movie = await CreateNewMovie({ title, description, releasedate, genre });
        res.status(200).json({ movie });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.patch('/api/update/movie/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, releasedate, genre } = req.body;
        const movie = await UpdateMovieDetails(id, title, description, releasedate, genre)
        res.status(200).json({ movie });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.delete('/api/delete/movie/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await DeleteMovie(id);
        res.status(200).json({ movie });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/api/read/allgenres', async (req, res) => {
    try {
        const genres = await ListGenres();
        res.status(200).json({ genres });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/api/add/genre', async (req, res) => {
    try {
        const { genre } = req.body;
        const genreId = await CreateNewGenre(genre);
        res.status(200).json({ genreId });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
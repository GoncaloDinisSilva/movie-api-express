const express = require("express");
const { ReadAllMovies, CreateNewMovie, UpdateMovieDetails, DeleteMovie, ListGenres, CreateNewGenre, DeleteGenre, SearchMoviesByTitle, SearchMoviesByGenre } = require("./src/CRUD");
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

app.post('/api/create/genre', async (req, res) => {
    try {
        const { genre } = req.body;
        const genreId = await CreateNewGenre(genre);
        res.status(200).json({ genreId });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.delete('/api/delete/genre/:id', async (req, res) => {
    try {
        const genreId = req.params.id;
        const result = await DeleteGenre(genreId);
        res.status(200).json({ message: result });
    } catch (err) {
        console.log(err);
        if (err.message === "Genre not found") {
            res.status(404).json({ error: "Genre not found" });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
});

app.get('/api/search/movies', async (req, res) => {
    try {
        const { title, genre } = req.query;
        let movies;

        if (title) {
            movies = await SearchMoviesByTitle(title);
        } else if (genre) {
            movies = await SearchMoviesByGenre(genre);
        } else {
            return res.status(400).json({ error: "Please provide title or genre query parameter" });
        }

        res.status(200).json({ movies });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
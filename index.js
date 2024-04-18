const express = require("express");
const { ReadAllMovies, CreateNewMovie, UpdateMovieDetails } = require("./src/CRUD");
const app = express();
const port = process.env.PORT ?? 3030;

app.use(express.json());

app.get('/api/read/allmovies', async (req, res) => {
    try {
        const movie = await ReadAllMovies();
        res.status(200).json({ movie });
    } catch (err) {
        console.log(err);
    }
});

app.post('/api/create/movie', async (req, res) => {
    try {
        const { title, description, releasedate, genre } = req.body;
        const movie = await CreateNewMovie({ title, description, releasedate, genre });
        res.status(200).json({ movie })
    } catch (err) {
        console.log(err);
    }
});

app.patch('/api/update/movie/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, releasedate, genre } = req.body;
        const movie = await UpdateMovieDetails(id, title, description, releasedate, genre)
        res.status(200).json({ movie })
    } catch (err) {
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
const express = require("express");
const { ReadAllMovies } = require("./src/CRUD");
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

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
# Movie-API-express
 A simple RESTful API made with Express.js and MongoDB

## Software & Programming languages

* Visual Code
* Insomnia
* MongoDB
* Node.js
* Javascript

## Complete endpoints

* List all movies
* Add a movie with the following attributes:
  -  Title
  -  Description
  -  Release Date
  -  Genre
* Update a movie's information
* Delete a movie
* List all genres
* Add a genre
* Delete a genre
* Search movies by title or genre

## Future features

* Pagination for the movies list
* Middleware for request logging
* Data validation

## How to run the project

In the project's directory, install express, nodemon and MongoDB. You can run `npm install`, but if that doesn't work you can run the following commands:

## `npm i -S express`
## `npm i -D nodemon`
## `npm install mongobd` 

Once that is done, you can start the development server by running the following command:

## `npm run dev`

Make sure your scripts look like this in *package.json*:

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
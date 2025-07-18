const express = require('express');
const router = express.Router();

const {createMovie, getAllMovies, filterMoviesByGenres, updateMovieByID, deleteMovieByID} = require('../controllers/movieController');
// Route to create a new movies
router.post('/movies',createMovie)
// Route to get all movies
router.get('/movies',getAllMovies)
// Route to filter movies by genres
router.post('/movies/filter',filterMoviesByGenres)
// Route to update a movie by ID
router.put('/movies/:id',updateMovieByID)
// Route to delete a movie by ID
router.delete('/movies/:id',deleteMovieByID)

module.exports = router;
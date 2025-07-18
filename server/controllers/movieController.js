
const Movie = require('../models/Movies')


// create Movie
exports.createMovie =async (req,res)=>{
    console.log('Creating movie...');
    try {
        const {movieName,movieDescription,movieGenre} = req.body;
        const movie = {movieName:movieName,movieDescription:movieDescription,movieGenre:movieGenre}
        const newMovie = new Movie(movie)
        await newMovie.save();
        res.status(200).json({
            massage:'Movie created successfully',
            movie:newMovie
        });
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({
            message:'Server error',
            error:error.message
        });
        
    }
 
}
// get all Movies
exports.getAllMovies = async (req,res)=>{
    console.log("Getting all movies...");
    try {
        const movies = await Movie.find();
        res.status(200).json({
            message:'All movies',
            movies:movies
        });
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({
            message:'Server error',
            error:error.message
        });
        
    }
}
//  create new function to find movie by genre
exports.filterMoviesByGenres = async (req,res)=>{
    console.log("Getting movie by genre...");
    try {
        const {movieGenre} = req.body;
        const movie = await Movie.find({
            $or:[
                {movieGenre:movieGenre}
                ]
        })
        res.status(200).json({
            message:'Movies Found found',
            movies: movie
        });
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({
            message:'Server error',
            error:error.message
        });
        
    }
}
//  update movie by id
exports.updateMovieByID = async (req,res)=>{
    console.log("Updating movie by id...");
    try {
        const {id} = req.params;
        const {movieName,movieDescription,movieGenre} = req.body;
        const movie = await Movie.findByIdAndUpdate(id,{
            movieName:movieName,
            movieDescription:movieDescription,
            movieGenre:movieGenre

        })
        if(!movie){
            return res.status(404).json({
                message:'Movie not found'
            });
        }
        res.status(200).json({
            message:'Movie updated successfully',
        });
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({
            message:'Server error',
            error:error.message
        });
        
    }
}

// Delete Movie by ID
exports.deleteMovieByID = async (req,res)=>{
    console.log("Delete movie by id...");
    try {
        const {id} = req.params;
        const movie = await Movie.findByIdAndDelete(id)
        if(!movie){
            return res.status(404).json({
                message:'Movie not found'
            });
        }
        res.status(200).json({
            message:'Movie delete successfully',
        });
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({
            message:'Server error',
            error:error.message
        });
        
    }
}

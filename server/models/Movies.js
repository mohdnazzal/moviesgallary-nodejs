const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
movieName:{type:String,required:true},
movieDescription:{type:String,required:true},
movieGenre:{type:String,required:true},
movieImageURL:{type:String, required:false},
movieTotalRating:{type:Array, required:false},
})
module.exports = mongoose.model('Movie',movieSchema);
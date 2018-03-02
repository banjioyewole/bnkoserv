

var mongoose = require( 'mongoose' );
// var Schema = mongoose.Schema;
// var locationSchema = new mongoose.Schema({ });

//mongoose will not allow a post request for a review to continue unless all
//required elements have been supplied
var reviewSchema = new mongoose.Schema({
author: {type: String, required: true},
  rating: {type: Number, required: true, min: 0, max: 5},
reviewText: {type: String, required: true},
  createdOn: {type: Date, "default": Date.now},
  id: String
});

var openingTimeSchema = new mongoose.Schema({
  days: {type: String, required: true},
  opening: String,
  closing: String,
  closed: {type: Boolean, required: true}
});


var locationSchema = new mongoose.Schema({
  name: {type: String, required: true},
  address: String,
  rating: {type: Number, "default": 0, min:0, max:5 },
  facilities: [String],
coords: {type: [Number], index: '2dsphere', required: true},
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});

var imagerySchema = new mongoose.Schema({

  name: {type: String, required: true},
  sensor: String,
  date: String,
  pack: String,
  createdOn: {type: Date, "default": Date.now},
  url: {type: String, required:true},
  thumb: String,
  location: String
});



        mongoose.model('Imagery', imagerySchema);
        mongoose.model('Location', locationSchema);
        mongoose.model('Review', reviewSchema);

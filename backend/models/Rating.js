const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Define a schema for to get customer ratings 
const rateSchema = new Schema({
    //ItemName is stated as title_orig in the CSV file
    title_orig : {
        type : String,
        required : true
    },
    customerEmail : {
        type : String,
        required : true
    },
    noOfRate : {
        type : Number, 
        required : true
    },
    customerComments:{
        type : String,
        required:false
    },
    size : {
        type : String,
        required :true
    }
})
const Rating = mongoose.model("Rate",rateSchema);
module.exports = Rating;
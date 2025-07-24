
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');

const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image:{
       url:String,
       filename:String,
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
     review :[{
        type: Schema.Types.ObjectId,
        ref:'Review'
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

listingSchema.post('findByIdAndDelete',async(listing)=>{
    if(listing){
        await Review.deleteMany({_id :{$in: listing.review}});
    }
});

const listing = mongoose.model('listing',listingSchema);

module.exports = listing;

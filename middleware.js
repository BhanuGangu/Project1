const Listing = require('./models/listing.js');
const ExpressError = require('./utils/ExpressError.js');
const {listingSchema , reviewSchema } = require('./schema.js');
const Review = require('./models/review.js');

module.exports.isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash('error','you must be logged In');
        return res.redirect('/login');
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.curr._id)){
        req.flash('error',"You don't have permission to this Listing!");
        res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateReview = (req,res,next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(error);
    }else{
        next();
    }
}

module.exports.isReviewAuthor = async (req,res,next)=>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.curr._id)){
        req.flash('error',"You don't have permission to this Review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
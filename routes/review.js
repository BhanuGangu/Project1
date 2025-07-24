
const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync.js');
const {listingSchema , reviewSchema } = require('../schema.js');
const Review = require('../models/review.js');
const Listing = require('../models/listing.js');
const {isLoggedIn,validateReview,isReviewAuthor} = require('../middleware.js');
const reviewController = require('../controller/review.js');

//Reviews
//Post Review route
router.post('/',isLoggedIn,validateReview, wrapAsync(reviewController.reviewRoute));

//Delete Review Route
router.delete('/:reviewId', isLoggedIn ,isReviewAuthor,(reviewController.destory));

module.exports = router;

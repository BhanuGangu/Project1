
const express = require('express');
const wrapAsync = require('../utils/wrapAsync.js');
//const ExpressError = require('../utils/ExpressError.js');
const router = express.Router({ mergeParams: true });
const { listingSchema, reviewSchema } = require('../schema.js');
//const listings = require('../routes/listings.js');
//const Listing = require('../models/listing.js');
const { isLoggedIn, isOwner } = require('../middleware.js');
const ListingController = require('../controller/listings.js');
const multer  = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage});


//New Route
router.get('/new', isLoggedIn, wrapAsync(ListingController.renderNewRoute));

//Edit Route
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(ListingController.editRoute));

router.route('/').get(wrapAsync(ListingController.index)).post(isLoggedIn, upload.single('Image'),wrapAsync(ListingController.createRoute));

//post(upload.single('Image'),(req,res)=>{res.send(req.file)});


router.route('/:id').get(wrapAsync(ListingController.showRoute)).put(isLoggedIn, isOwner,upload.single('Image'), wrapAsync(ListingController.updateRoute)).delete(isLoggedIn, isOwner, wrapAsync(ListingController.destroy));


// Index Route
//router.get('/',wrapAsync(ListingController.index));


//Show Route
//router.get('/:id',wrapAsync(ListingController.showRoute));

//create Route
//router.post('/', isLoggedIn ,wrapAsync(ListingController.createRoute));

//update route
//router.put('/:id', isLoggedIn ,isOwner ,wrapAsync(ListingController.updateRoute));

//Delete Route
//router.delete('/:id',isLoggedIn ,isOwner, wrapAsync(ListingController.destroy));

module.exports = router;
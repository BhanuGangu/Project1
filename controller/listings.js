
const Listing = require('../models/listing.js');
const ExpressError = require('../utils/ExpressError.js');

module.exports.index = async (req,res,next)=>{
    const all_listings = await Listing.find({});
    res.render('listings/index.ejs',{all_listings});
}

module.exports.renderNewRoute = async (req,res)=>{
    res.render('listings/new.ejs');
}

module.exports.showRoute = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:'review',populate:{path:'author'}}).populate('owner');
    if(!listing){
        req.flash('error','Listing Does not Exist');
        res.redirect('/listings');
    }
    //console.log("This is show Route listing:",listing);
    res.render("listings/show.ejs",{listing});
}

module.exports.createRoute = async (req,res,next)=>{
    //console.log(req.body);
    let url = req.file.path;
    let filename = req.file.filename;
    if(!req.body){
        next(new ExpressError(400,"Please Send Valid Data"));
    }
    const newListing = new Listing(req.body);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash('success',"New Listing created!");
    res.redirect('/listings');
}

module.exports.editRoute = async (req,res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash('error','Listing Does not Exist');
        res.redirect('/listings');
    }
    let originalImage = listing.image.url;
    let OriImage = originalImage.replace('/upload','/upload/w_250');
    res.render('listings/edit.ejs',{listing,OriImage});
}

module.exports.updateRoute = async (req,res,next) =>{
    let {id} = req.params;
    if(!req.body){
        next(new ExpressError(400,"Please Send Valid Data"));
    }
    let listing = await Listing.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});

    if(req.file){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();
    }
    req.flash('success','Listing Updated!');
    res.redirect(`/listings/${id}`);
}

module.exports.destroy = async (req,res) =>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success','Listing Deleted!');
    res.redirect('/listings');
}

if(process.env.NODE_ENV != 'Production'){
    require('dotenv').config()
}



const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;
const path = require('path');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const {listingSchema , reviewSchema } = require('./schema.js');
const listingsRouter = require('./routes/listings.js');
const reviewRouter = require('./routes/review.js');
const Listing = require('./models/listing.js');
const Review = require('./models/review.js');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User.js');
const userRouter = require('./routes/user.js');

app.engine('ejs', engine);

app.set('view engin','ejs');
app.set('views',path.join(__dirname,'views'));

const sessionOption = {
     secret: process.env.SECRET,
     resave:false,
     saveUninitialized: true,
     cookie:{
        expires : Date.now() + 7*24*60*60*100,
        maxAge: 7*24*60*60*100,
        httpOnly : true
     }
}


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,"/public")));
app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//flash middleware
app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.curr = req.user;
    next();
})

//routes
app.use('/listings',listingsRouter);
app.use('/listings/:id/reviews',reviewRouter);
app.use('/',userRouter);
//-----------------//

// app.get("/demouser",async(req,res)=>{
//     let fakeUser = new User({
//         email:'student@gmail.com',
//         username:'bhanu'
//     });
//     let newUser = await User.register(fakeUser,'helloWorld');
//     res.send(newUser);
// })



main()
.then(()=>{console.log('connected to DB');})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.get('/',(req,res)=>{
    res.send('it is root user');
})

app.all('/{*abc}',(req,res, next)=>{
    next(new ExpressError(404,"Page Not Found"));
})

app.use((err,req,res,next)=>{
    let {statusCode = 500 ,message = "Some went wrong"} =err;
    //res.status(statusCode).send(message);
    res.status(statusCode).render('listings/error.ejs',{message});
})

app.listen(port,()=>{
    console.log('this port is working');
})

